import { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import { FaPencilAlt } from "react-icons/fa";

export default function TaskCard({ task, onUpdate }) {
    const { title, descriptions, image } = task;
    const [imageUrl, setImageUrl] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [editTask, setEditTask] = useState(task);

    useEffect(() => {
        const getUrlImage = async () => {
            const supabase = createClient();
            const { data } = supabase.storage
                .from("archivos")
                .getPublicUrl(image);
            
            setImageUrl(data.publicUrl || null);
        };

        if (image) {
            getUrlImage();
        }
    }, [image]);

    const handleUpdate = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("No hay un usuario autenticado");
            return;
        }

        let filePath = task.image;

        if (editTask.image && typeof editTask.image !== "string") {
            if (editTask.image.type !== "image/png" && editTask.image.type !== "image/jpeg") {
                alert("Solo se permiten imágenes");
                return;
            }

            const newFilePath = `${user.id}/${editTask.image.name}`;
            const { error: errorImage } = await supabase.storage
                .from("archivos")
                .upload(newFilePath, editTask.image, { cacheControl: '3600' });

            if (errorImage) {
                if (errorImage.message.includes("already exists")) {
                    filePath = newFilePath;
                } else {
                    alert("Error imagen: " + errorImage.message);
                    return;
                }
            } else {
                alert("Imagen subida con éxito");
                filePath = newFilePath;
            }
        }

        // AQUÍ Usamos select() para confirmar el cambio 
        const { data: updatedData, error: dbError } = await supabase
            .from("tasks")
            .update({
                title: editTask.title,
                descriptions: editTask.descriptions, 
                image: filePath
            })
            .eq("id", task.id)
            .select(); // Esto obliga a Supabase a devolver la fila editada

        if (dbError) {
            console.error("Error DB:", dbError.message);
            alert("Error base de datos: " + dbError.message);
        } else if (updatedData && updatedData.length > 0) {
            alert("¡Tarea y textos actualizados!");
            setIsEdit(false);
            if (onUpdate) onUpdate();
        } else {
            // Si llega aquí, el ID no coincidió o RLS bloqueó el UPDATE
            alert("No se encontró la tarea o no tienes permisos para editarla.");
        }
    };

    return (
        
            <div className=" w-[30%] border border-gray-600 p-4 rounded-lg bg-gray-800 text-white mb-4  relative ">
            {isEdit ? (
                <div className="flex flex-col gap-3">
                    <input 
                        type="text"
                        className="bg-gray-700 p-2 rounded outline-none border border-blue-500 text-white"
                        value={editTask.title || ""}
                        onChange={(e) => setEditTask({...editTask, title: e.target.value})}
                    />
                    <textarea 
                        className="bg-gray-700 p-2 rounded outline-none border border-blue-500 text-white"
                        value={editTask.descriptions || ""}
                        onChange={(e) => setEditTask({...editTask, descriptions: e.target.value})}
                    />
                    <input 
                        type="file" 
                        className="text-sm"
                        onChange={(e) => setEditTask({...editTask, image: e.target.files[0]})}
                    />
                    <div className="flex gap-2 mt-2">
                        <button 
                            type="button"
                            onClick={handleUpdate} 
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold"
                        >
                            Guardar
                        </button>
                        <button 
                            type="button"
                            onClick={() => setIsEdit(false)} 
                            className="bg-red-500/20 hover:bg-red-500/40 text-red-500 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                
                    <div className="flex flex-col gap-2 w-[100%]">
                    <button 
                        type="button"
                        onClick={() => setIsEdit(true)} 
                        className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 hover:text-white transition"
                    >
                        <FaPencilAlt size={16} />
                    </button>
                    <h2 className="text-xl font-bold pr-10">{title}</h2>
                    <p className="text-gray-400">{descriptions}</p>
                    {imageUrl && (
                        <img 
                            src={imageUrl} 
                            alt={title} 
                            className="w-full h-[250px] object-cover rounded-md mt-2" 
                        />
                    )}
                </div>
               
            
            )}
        </div>
        
       
    );
}
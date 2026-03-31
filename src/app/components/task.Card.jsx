import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export default function TaskCard({ task, onUpdate }) {
  const { title, descriptions, image } = task;
  const [imageUrl, setImageUrl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState(task);

  const [deleteTask, setDeleteTask] = useState(false);

  useEffect(() => {
    const getUrlImage = async () => {
      const supabase = createClient();
      const { data } = supabase.storage.from("archivos").getPublicUrl(image);

      setImageUrl(data.publicUrl || null);
    };

    if (image) {
      getUrlImage();
    }
  }, [image]);

  const handleUpdate = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("No hay un usuario autenticado");
    return;
  }

  let filePath = task.image;

  if (editTask.image && typeof editTask.image !== "string") {
    if (
      editTask.image.type !== "image/png" &&
      editTask.image.type !== "image/jpeg"
    ) {
      alert("Solo se permiten imágenes");
      return;
    }

    if (task.image) {
      let pathToDelete = task.image.split('archivos/').pop();
      pathToDelete = decodeURIComponent(pathToDelete).trim();
      await supabase.storage.from("archivos").remove([pathToDelete]);
    }

    const newFilePath = `${user.id}/${Date.now()}-${editTask.image.name}`;
    const { error: errorImage } = await supabase.storage
      .from("archivos")
      .upload(newFilePath, editTask.image, { cacheControl: "3600" });

    if (errorImage) {
      if (errorImage.message.includes("already exists")) {
        filePath = newFilePath;
      } else {
        alert("Error imagen: " + errorImage.message);
        return;
      }
    } else {
      filePath = newFilePath;
    }
  }

  const { data: updatedData, error: dbError } = await supabase
    .from("tasks")
    .update({
      title: editTask.title,
      descriptions: editTask.descriptions,
      image: filePath,
    })
    .eq("id", task.id)
    .select();

  if (dbError) {
    console.error("Error DB:", dbError.message);
    alert("Error base de datos: " + dbError.message);
  } else if (updatedData && updatedData.length > 0) {
    alert("¡Tarea y textos actualizados!");
    setIsEdit(false);
    if (onUpdate) onUpdate();
  } else {
    alert("No se encontró la tarea o no tienes permisos para editarla.");
  }
};

  const handleDelete = async (id) =>  {
    const supabase = createClient();
    
    const { data: authData} = await supabase.auth.getUser();

    const user = authData?.user;

    if (!user) {
        alert("No hay un usuario autenticado");
        return;
    }

    const { data: taskData, error: fetchError } = await supabase
        .from("tasks")
        .select("image")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();
         
        if (fetchError || !taskData) {
        console.error("Error al buscar la tarea:", fetchError);
        return;
    }
    // 2. borrar imagen
    
        if (taskData.image) {
            let pathToDelete = taskData.image.split('archivos/').pop();
            pathToDelete = decodeURIComponent(pathToDelete).trim();

            const { data, error: storageError } = await supabase.storage
                .from("archivos")
                .remove([pathToDelete]);

            if (storageError) {
              console.error("Error al borrar archivo:", storageError.message);
            } else if (data && data.length > 0) {
              console.log("Archivo eliminado correctamente:", data);
            } else {
            console.warn("No se encontró el archivo en la ruta:", pathToDelete);
            }
}
  
    const { data: deletedData, error: dbError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id)
        .select()

         if (dbError) {
      console.error("Error DB:", dbError.message);
      alert("Error base de datos: " + dbError.message);
    } else {
      alert("¡Tarea eliminada!");
      if (onUpdate) onUpdate();
    }  
    setDeleteTask(false); 
    


    };

            
    

    

    return (
   <div className="w-full max-w-[350px] border border-slate-200 p-5 rounded-2xl bg-white text-slate-800 mb-6 relative shadow-sm hover:shadow-md transition-shadow">
  {isEdit ? (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        className="bg-slate-50 p-2.5 rounded-lg outline-none border border-slate-200 focus:border-indigo-500 text-slate-900 transition-all w-full"
        value={editTask.title || ""}
        onChange={(e) =>
          setEditTask({ ...editTask, title: e.target.value })
        }
      />
      <input
        type="text"
        className="bg-slate-50 p-2.5 rounded-lg outline-none border border-slate-200 focus:border-indigo-500 text-slate-900 transition-all w-full"
        value={editTask.descriptions || ""}
        onChange={(e) =>
          setEditTask({ ...editTask, descriptions: e.target.value })
        }
      />
      <input
        type="file"
        className="text-xs text-slate-500 w-full"
        onChange={(e) =>
          setEditTask({ ...editTask, image: e.target.files[0] })
        }
      />
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={handleUpdate}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={() => setIsEdit(false)}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium"
        >
          Cancelar
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-3 w-full">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          type="button"
          onClick={() => setIsEdit(true)}
          className="p-2 bg-slate-50 hover:bg-indigo-50 rounded-full text-slate-400 hover:text-indigo-600"
        >
          <FaPencilAlt size={14} />
        </button>
        <button
          type="button"
          onClick={() => setDeleteTask(true)}
          className="p-2 bg-slate-50 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-600"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>

      <h2 className="text-xl font-bold pr-20 text-slate-900 leading-tight">{title}</h2>
      <p className="text-slate-500 text-sm leading-relaxed">{descriptions}</p>
      
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[200px] object-cover rounded-xl mt-2 border border-slate-100 shadow-inner"
        />
      )}

      {deleteTask && (
        <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 border-2 border-red-100">
          <h4 className="text-slate-900 font-bold text-sm">¿Confirmas que quieres eliminar esta tarea?</h4> 
          <div className="flex gap-3 w-full">
            <button 
              onClick={() => handleDelete(task.id)} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold shadow-lg shadow-red-200"
            >
              Eliminar
            </button>
            <button 
              onClick={() => setDeleteTask(false)} 
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg text-sm font-bold"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  )}
</div>
    );
}

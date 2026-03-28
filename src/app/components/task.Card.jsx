import { useState, useEffect } from "react"
import { createClient } from "../utils/supabase/client";
import { FaPencilAlt } from "react-icons/fa";

export default function TaskCard ({task}){

    
    const {title, descriptions, image}=task
    const [imageUrl, setImageUrl]= useState(null)
    const [isEdit, setIsEdit]=useState(false)
    const [editTask, setEditTask]=useState(task)

   useEffect(() => {
            const getUrlImage = async () => {
            const supabase = createClient();
            const { data } = supabase.storage
                .from("archivos")
                .getPublicUrl(image);
                setImageUrl(data.publicUrl);
        };

        if (image) {
            getUrlImage();
        }
    }, [image]);


    
     return (
    


        <div className="w-[35%]" >
               <div>
        {isEdit ? (
            
            <input 
                type="file" 
                onChange={(e) => {
                    const archivo = e.target.files[0];
                    if (archivo) {
                        setEditTask({ ...editTask, image: archivo });
                    }
                }} 
            />
        ) : (
          
            <img 
                className="w-full h-[250px] object-cover" 
                src={imageUrl || null} 
                alt={title} 
            />
        )}
    </div>

           
            {
                isEdit
                ?
                <input type="text"  value={editTask.title } onChange={(e)=>setEditTask(e.target.value)}/>
                :<p>{title}</p>
            }
           
           {
             isEdit
                ?
                <input type="text"  value={editTask.descriptions } onChange={(e)=>setEditTask(e.target.value)}/>
                 :<p>{descriptions}</p>
           }
           
            <button onClick={()=>setIsEdit(!isEdit)}>
                <FaPencilAlt/>
            </button>
        </div>
    );
}

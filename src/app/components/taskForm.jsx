"use client";

import { useState, useRef } from "react";
import { createClient } from "../utils/supabase/client";

export default function TaskForm() {

  const [task, setTask] = useState({
    title: "",
    description: "",
    image:null
  });
  const [errors , setError]=useState({title:"", description:""})
  const inputFileRef=useRef(null)

  
  
  const handlesubmit = async (e) => {
      

    
    let currentErrors = { title: "", description: "" };
    let hasError = false;

    if(task.title.trim()===""){
      currentErrors.title="* campo requreido"
     hasError=true
    }
   
    if(task.description.trim()===""){
      currentErrors.description="* campo requreido"
     hasError=true
    }
    setError(currentErrors);

    if (hasError){
      alert("porfavor completa los campos")
      return;
    } 

     

    try {

    

      const supabase = createClient();

      const { data:{user}  } = await supabase.auth.getUser();

       if (task.image.type!=="image/png" && task.image.type!=="image/jpeg"){
        alert("solo se pertmiten imagenes")
        return
       }
       if(!user){
        alert("no hay un usario")
        return

       }

      const filePath =`${user.id}/${task.image.name}`;
      const {data:dataImage, error:errorImage}= await supabase.storage.from("archivos").upload(filePath,task.image, {cacheControl:'3600'})
      //  console.log('img data', dataImage);
      
           
            if(errorImage){
                alert("Error al subir la imagen")
                return
            }

      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("tasks").insert({
        title: task.title,
        descriptions: task.description, // tu tabla tiene descriptions
        user_id: userData.user.id,
        image:dataImage.path
      });
        
      
      if (error) throw error;

      alert("tarea registrada correctamente");

    } catch (error) {
      console.log(error);
    }
  };

 
    return (
        <div className="flex flex-col gap-2 w-full justify-center items-center h-screen bg-gray-100 ">
          

              <form onSubmit={(e) => {
            e.preventDefault();
            handlesubmit();
        }}        className="flex flex-col gap-4  justify-center items-center  w-[60%] h-[auto] bg-gray-400 rounded-lg  text-center py-4 px-6 ">  
          <h2 className="text-xl">crear tarea</h2>
            <input className="w-[80%]  bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="titulo de la  tarea" onChange={(e)=>setTask({...task, title: e.target.value})} />

            {errors.title && <span  className="text-red-500 ">
            {errors.title}
            </span>

            }
            


            <input className="w-[80%]  bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="descripcion de la tarea" onChange={(e)=>setTask({...task, description: e.target.value})} />
            

            {errors.description && <span  className="text-red-500 ">
            {errors.description}
            </span>
              }
              <input ref={inputFileRef} className="w-[80%]  bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="file" onChange={(e) => setTask({ ...task, image: e.target.files[0] })} name="image" />
              {
                task.image 
                && 
                <img onClick={()=>{
                  inputFileRef.current.click()
                }} src={URL.createObjectURL(task.image)} className="w-[300px] cursor-pointer hover:scale-105" alt="" />
              }

              {
                !task.image
                  &&
                  <div onClick={()=>{
                  inputFileRef.current.click()
                  }}>
                  selecciona tu imagen
                  </div>
              }
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  >
                registrar tarea
            </button>
        </form>
        </div>
      
    )
}

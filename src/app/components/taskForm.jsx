"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";

export default function TaskForm() {

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  
  const handlesubmit = async () => {
    if (task.title=== "" || task.description=== "") {
        alert("por favor completa todos los campos");
        return;
        }
    
    try {

      const supabase = createClient();

      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await supabase.from("tasks").insert({
        title: task.title,
        descriptions: task.description, // tu tabla tiene descriptions
        user_id: userData.user.id,
        
      });
        
      
      if (error) throw error;

      alert("tarea registrada correctamente");

    } catch (error) {
      console.log(error);
    }
  };

 
    return (
        <div className="flex flex-col gap-2 w-full justify-center items-center h-screen bg-gray-100">
          

              <form onSubmit={(e) => {
            e.preventDefault();
            handlesubmit();
        }}        className="flex flex-col gap-4 w-[300px] justify-center items-center h-[350px] bg-gray-400 rounded-lg  text-center"
        >   <h2 className="text-xl">crear tarea</h2>
            <input className="w-[80%]  bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="titulo de la  tarea" onChange={(e)=>setTask({...task, title: e.target.value})} />
            
            <span className="text-red-500 hidden">* campo requerido</span>
            <input className="w-[80%]  bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="descripcion de la tarea" onChange={(e)=>setTask({...task, description: e.target.value})} />

            <span className="text-red-500 hidden">* campo requerido</span>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  >
                registrar tarea
            </button>
        </form>
        </div>
      
    )
}

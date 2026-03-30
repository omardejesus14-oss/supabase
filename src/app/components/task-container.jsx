"use client"

import { createClient } from "../utils/supabase/client"
import { useEffect, useState } from "react"
import TaskCard from "./task.Card"

export default function TaskContainer() {
    const [tasks, setTasks] = useState([]);
      const fetchTasks = async () => {
                const supabase = createClient();
                const { data: userData } = await supabase.auth.getUser();

                console.log(userData.user.id);

                const { data } = await supabase.from('tasks')
                    .select('*')
                    .eq('user_id', userData.user.id);

                console.log(data);
                setTasks(data);
            }
           
    useEffect(
        () => {
             fetchTasks()
        }, []
    )

    return (
        <div className="flex bg-gray-100 gap-3 flex-wrap justify-center items-center p-4">
            {
                tasks.length > 0 
                ? (
                    tasks.map(
                        task=>(
                            <TaskCard key={task.id} 
                            task={task}
                             onUpdate={fetchTasks} />
                        )
                    )
                )
                : <h2>No hay tareas disponibles.</h2>
            }
        </div>
    )
}
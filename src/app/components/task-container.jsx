"use client"

import { createClient } from "../utils/supabase/client"
import { useEffect, useState } from "react"
import TaskCard from "./task.Card"

// Definimos supabase aquí afuera para que todo el archivo lo pueda usar
const supabase = createClient();

export default function TaskContainer() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const { data: userData } = await supabase.auth.getUser();

        if (userData?.user) {
            const { data } = await supabase.from('tasks')
                .select('*')
                .eq('user_id', userData.user.id)
                .order('created_at', { ascending: false }); // Para que la nueva salga de primera

            setTasks(data || []);
        }
    }

    useEffect(() => {
        fetchTasks();

        const channel = supabase
            .channel('cambios-tareas')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'tasks' }, 
                () => {
                    fetchTasks(); 
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="flex bg-slate-50 gap-6 flex-wrap justify-center items-start p-8 overflow-y-auto min-h-[50vh]">
            {
                tasks.length > 0 
                ? (
                    tasks.map(
                        task => (
                            <TaskCard 
                                key={task.id} 
                                task={task}
                                
                                title={task.title}
                                descriptions={task.descriptions}
                                imageUrl={task.imageUrl}
                                onUpdate={fetchTasks} 
                            />
                        )
                    )
                )
                : <h2 className="text-slate-400 mt-10">No hay tareas disponibles.</h2>
            }
        </div>
    )
}
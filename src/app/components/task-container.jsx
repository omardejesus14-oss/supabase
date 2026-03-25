"use client"

import { createClient } from "../utils/supabase/client"
import { useEffect } from "react"

export default function TaskContainer() {

    useEffect(
        () => {
            const fetchTasks = async () => {
                const supabase = createClient();
                const { data: userData } = await supabase.auth.getUser();

                console.log(userData.user.id);

                const { data } = await supabase.from('tasks')
                    .select('*')
                    .eq('user_id', userData.user.id);
            }
            fetchTasks()

        }, []
    )

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
            <h1>task container</h1>
        </div>
    )
}
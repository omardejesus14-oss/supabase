"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Custom from "./custom";

export default function LoginForm() {

    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors]=useState("")

    const login = async () => {
        try {
            const supabese = createClient();
            const { data, error } = await supabese.auth.signInWithPassword({
                 email: user.email.trim(),
                password: user.password,
            });
            if (error) {
           
            setErrors({
                email: "Correo o contraseña incorrectos",
                password: "Correo o contraseña incorrectos",
                
            });
            return;
        }

            if (error) throw error;
            if (data) {
                alert ("iniciastes sesión correctamente");
                router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
        }

    return (
       
          <div className="w-[100%] h-screen flex justify-center items-center bg-gray-200">
             <form onSubmit={(e) => {
            e.preventDefault();
            login();
            
        }}
        className="flex flex-col justify-center items-center gap-4 w-[60%] h-[70%] bg-gray-500 rounded-lg text-center"
        > 
            <h2 className="text-xl">Iniciar sesión</h2>

            <input className="w-[80%] border border-gray-600 rounded-md py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text" 
                placeholder="Ingresa tu email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
             
           
            <Custom placeholder={"ingresa tu contraceña"} onchange={(yuca)=>setUser({...user, password:yuca})}
            secure
            />
             {errors.password && <span className="text-red-500">{errors.password}</span>}
                
            <button className="bg-blue-300 hover:bg-blue-100 text-black| font-bold py-2 px-4 rounded">iniciar sesión</button>
            <h3>si no tienes una cuenta, <Link href="/register" className="text-blue-500 hover:underline">regístrate</Link></h3>
        </form>

          </div>
        
    )
}
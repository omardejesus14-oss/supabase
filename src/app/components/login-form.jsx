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
       
          <div className="min-h-screen flex justify-center items-center bg-slate-50 font-sans"> 
    <form onSubmit={(e) => {
        e.preventDefault();
        login();
    }}
    className="flex flex-col justify-center items-center gap-6 w-full max-w-md h-auto py-10 px-8 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50"
    > 
        <div className="text-center space-y-2 mb-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bienvenido</h2>
            <p className="text-slate-500 text-sm">Ingresa tus credenciales para continuar</p>
        </div>

        <div className="w-full flex flex-col gap-1 items-center">
            <input className="w-[90%] border border-slate-200 rounded-xl py-3 px-4 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                type="text" 
                placeholder="Ingresa tu email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            {/* Si tienes errores de email, puedes agregarlos aquí igual que en el registro */}
        </div>
        
        <div className="w-full flex flex-col gap-1 items-center">
            <Custom 
                placeholder={"Ingresa tu contraseña"} 
                onchange={(yuca) => setUser({...user, password:yuca})}
                secure
            />
            {errors.password && <span className="text-red-500 text-xs mt-1 w-[90%] text-left">{errors.password}</span>}
        </div>
            
        <button 
            type="submit"
            className="w-[90%] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-indigo-200"
        >
            Iniciar sesión
        </button>

        <div className="mt-2 text-sm text-slate-600 text-center">
            ¿No tienes una cuenta? <Link href="/register" className="text-indigo-600 font-semibold hover:underline">Regístrate</Link>
        </div>
    </form>
</div>
        
    )
}
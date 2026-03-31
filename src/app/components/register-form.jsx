"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
import Custom from "./custom";

export default function RegisterForm() {

    
    const [errors, setErrors]=useState({email:"", password:"", confirmarpasword:""})
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmarpasword:""
    });

    const [loading, setLoading] = useState(false);
    
    const registrar = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let currentErrors ={email:"", password:"", confirmarpasword:""}
    let hasError=false

    if(user.email===""){
        currentErrors.email= "* campo requerido o estas escribiendo mal"
        hasError=true
    }else if (!emailRegex.test(user.email)) {
    currentErrors.email = "* formato de correo inválido (falta @ o .com)";
    hasError = true;
}
    if(user.password===""){
        currentErrors.password= "* campo requerido"
        hasError=true
    }else if(user.password.length<6){
        currentErrors.password="* la clave deve ser igual o mayor a 6 dogitos"
        hasError=true
    }
    if(user.confirmarpasword===""){
        currentErrors.confirmarpasword= "* campo requerido"
        hasError=true
    }
    if (!hasError && user.password !== user.confirmarpasword) {
    currentErrors.confirmarpasword = "* las contraseñas no coinciden";
    hasError = true;
   
  }

    setErrors(currentErrors);
    if(hasError){
        return
    }

    
    try {
        const supabase = createClient();
        const { data, error } = await supabase .auth.signUp({
            email: user.email.trim(),
            password: user.password,
        });

        

        if (error) throw error;
        if (data) {
            alert ("te registraste correctamente");
            router.push("/login");

        }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
     }
    
    return (
       <div className="min-h-screen flex justify-center items-center bg-slate-50 font-sans"> 
    <form onSubmit={(e) => {
        e.preventDefault();
        registrar();
    }}
    className="flex flex-col justify-center items-center gap-6 w-full max-w-md h-auto py-10 px-8 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50"
    >   
        <div className="text-center space-y-2 mb-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Crear cuenta</h2>
            <p className="text-slate-500 text-sm">Comienza a organizar tus proyectos hoy mismo</p>
        </div>

        <div className="w-full flex flex-col gap-1 items-center">
            <input className="w-[90%] border border-slate-200 rounded-xl py-3 px-4 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                type="text" 
                placeholder="Ingresa tu email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            {errors.email && <span className="text-red-500 text-xs mt-1 w-[90%] text-left">{errors.email}</span>}
        </div>
        
        <div className="w-full flex flex-col gap-1 items-center">
            <Custom 
                placeholder={"Ingresa tu contraseña"}
                value={user.password}
                onchange={(yuca) => setUser({...user, password:yuca})}
                secure
            />
            {errors.password && <span className="text-red-500 text-xs mt-1 w-[90%] text-left">{errors.password}</span>}
        </div>

        <div className="w-full flex flex-col gap-1 items-center">
            <Custom 
                placeholder={"Confirma tu contraseña"} 
                value={user.confirmarpasword}
                onchange={(yuca) => setUser({...user, confirmarpasword:yuca})}
                secure
            /> 
            {errors.confirmarpasword && <span className="text-red-500 text-xs mt-1 w-[90%] text-left">{errors.confirmarpasword}</span>}
        </div>

        <button  
            type="submit"
            disabled={loading} 
            className="w-[90%] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:active:scale-100"
        >
            {loading ? "Registrando..." : "Registrar"}
        </button>

        <div className="mt-2 text-sm text-slate-600">
            ¿Ya tienes una cuenta? <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Inicia sesión</Link>
        </div>
    </form>
</div>
    )
}
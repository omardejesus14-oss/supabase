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
       <div className="w-100% h-screen flex justify-center items-center bg-gray-100 "> 
        <form onSubmit={(e) => {
            e.preventDefault();
            // if (user.password!==user.confirmarpasword){
            //     alert("las contraceñas no coinciden")
            //     return
            // }
            registrar();
        }}
        className="flex flex-col justify-center items-center gap-4 w-[61%] h-[auto] py-4 px-6  bg-gray-500 rounded-lg "
        >   
            <h2 className="text-xl">Registrar</h2>

            <input className="w-[85%]  border border-gray-600 rounded-md py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text" 
                placeholder="Ingresa tu email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
            
        
            <Custom placeholder={"ingresa tu contraceña"}
                value={user.password}
                onchange={(yuca) => setUser({...user, password:yuca})}
                secure
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}



            <Custom placeholder={"ingresa tu contraceña"} 
                value={user.confirmarpasword}
                onchange={(yuca) => setUser({...user, confirmarpasword:yuca})}
            secure
            /> 
            {errors.confirmarpasword && <span className="text-red-500">{errors.confirmarpasword}</span>}
            <button  type="submit"
            disabled={loading} className="bg-blue-300 hover:bg-blue-100 text-black| font-bold py-2 px-4 rounded">Registrar</button>

            <h3>si ya tienes una cuenta, <Link href="/login" className="text-blue-500 hover:underline">inicia sesión</Link></h3>
        </form>
        </div>
    )
}
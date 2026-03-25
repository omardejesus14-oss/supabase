"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
import Custom from "./custom";

export default function RegisterForm() {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmarpasword:""
    });

    const [loading, setLoading] = useState(false);
    
    const registrar = async () => {
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
       <div className="w-full h-screen flex justify-center items-center bg-gray-100 "> 
        <form onSubmit={(e) => {
            e.preventDefault();
            if (user.password!==user.confirmarpasword){
                alert("las contraceñas no coinciden")
                return
            }
            registrar();
        }}
        className="flex flex-col justify-center items-center gap-4 w-[600px] h-[350px] bg-gray-500 rounded-lg "
        >   
            <h2 className="text-xl">Registrar</h2>

            <input className="w-[80%]  border border-gray-600 rounded-md py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text" 
                placeholder="Ingresa tu email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            
           
            <Custom placeholder={"ingresa tu contraceña"}
             value={user.password}
             onchange={(yuca) => setUser({...user, password:yuca})}
                        secure
                        />


             <Custom placeholder={"ingresa tu contraceña"} 
                value={user.confirmarpasword}
                onchange={(yuca) => setUser({...user, confirmarpasword:yuca})}
                        secure
                        /> 
            <button  type="submit"
          disabled={loading} className="bg-blue-300 hover:bg-blue-100 text-black| font-bold py-2 px-4 rounded">Registrar</button>

            <h3>si ya tienes una cuenta, <Link href="/login" className="text-blue-500 hover:underline">inicia sesión</Link></h3>
        </form>
        </div>
    )
}
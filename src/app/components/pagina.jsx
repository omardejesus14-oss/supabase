"use client";

import Link from "next/link";



export default function Pagina() {
        

    return (
        <div className="w-full h-screen flex flex-col bg-gray-700 text-white justify-center items-center gap-4 ">
            <h1 className="text-xl">pagina de inicio</h1>
            <div className="flex gap-4 justify-center items-center w-full h-full">

                <Link href="/register" className="bg-gray-300 hover:bg-gray-300 rounded border border-gray-300 w-auto p-2 text-black"> ir a registrar</Link>
                <Link href="/login" className="bg-gray-300 hover:bg-gray-300 rounded border border-gray-300 w-auto px-4 py-2 text-black"> ir a iniciar sesión</Link>
            </div>
           
           
        </div>
    )
}
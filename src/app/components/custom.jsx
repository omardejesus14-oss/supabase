"use client"

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {  useState } from "react";

export default function Custom({secure, onchange, placeholder, value} ) {

    const [mostrar, setMostrar] = useState(false);

    const alternateEyes = () => {
        if (mostrar) {
            return <FaRegEye />
        } else {
            return <FaRegEyeSlash />
        }
    }

        const toggleVisibility = () => {
            setMostrar(!mostrar);
        }
    

    return (
       <div className="w-[90%] flex items-center border border-slate-200 rounded-xl py-3 px-4 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all shadow-sm">
    <input 
        className="bg-transparent border-none outline-none focus:ring-0 w-full text-slate-900 placeholder-slate-400" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onchange(e.target.value)} 
        type={mostrar ? "text" : "password"}  
    />

    {secure && (
        <div onClick={toggleVisibility} className="cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors ml-2">
            {alternateEyes()}
        </div>
    )}
</div>
    )
}
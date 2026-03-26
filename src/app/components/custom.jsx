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
        <div className="w-[600px] flex text-center border border-gray-600 rounded-md py-2 px-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
            <input  className=" bg-transparent border-none outline-none focus:ring-0 w-[100%] " placeholder={placeholder} 
            value={value}
            
            onChange={(e)=>onchange(e.target.value)} type={mostrar ? "text" : "password"}  />

            {
                secure ? <div onClick={toggleVisibility} >
                    {alternateEyes()}
                </div> : null
            }
          
        </div>
    )
}
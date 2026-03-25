"use client"

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {  useState } from "react";

export default function Custom( secure, onchange, placeholder) {

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
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
            <input placeholder={placeholder} onChange={(e)=>onchange(e.target.value)} type={mostrar ? "text" : "password"}  />

            {
                secure ? <div onClick={toggleVisibility} >
                    {alternateEyes()}
                </div> : null
            }
          
        </div>
    )
}
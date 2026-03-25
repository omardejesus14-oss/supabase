"use client"

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {  useState } from "react";

export default function Custom({secure, onchange, placeholder} ) {

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
        <div className=" flex text-center border border-gray-600 rounded-md py-2 px-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ">
            <input  className="bg-transparent outline-none border-none " placeholder={placeholder} onChange={(e)=>onchange(e.target.value)} type={mostrar ? "text" : "password"}  />

            {
                secure ? <div onClick={toggleVisibility} >
                    {alternateEyes()}
                </div> : null
            }
          
        </div>
    )
}
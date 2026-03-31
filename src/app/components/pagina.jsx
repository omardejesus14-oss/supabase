"use client";

import Link from "next/link";
import Custom from "./custom";



export default function Pagina() {
        

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
    
    
    <main className="max-w-5xl mx-auto flex flex-col justify-center items-center px-6 text-center gap-8 pt-32 pb-20">
        <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full tracking-wide">
                Organización Inteligente
            </span>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                Gestiona tus proyectos <br />
                <span className="text-indigo-600">sin fricciones.</span>
            </h1>
          
            <p className="text-slate-600 max-w-2xl mx-auto text-xl leading-relaxed">
                La plataforma diseñada para equipos que buscan claridad. Organiza tus tareas, adjunta archivos y cumple tus objetivos a tiempo.
            </p>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Link 
                href="/login" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-10 py-4 rounded-xl transition-all shadow-md active:scale-95"
            >
                ir a iniciar sesion
            </Link>
            <Link 
                href="/register" 
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium px-10 py-4 rounded-xl transition-all shadow-sm active:scale-95"
            >
                registrarse
            </Link>
        </div>
    </main>

    {/* --- FEATURES SECTION --- */}
    <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Flujo de Trabajo</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Organiza tus tareas diarias con un sistema intuitivo de tarjetas y estados en tiempo real.</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Gestión de Archivos</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Sube capturas de pantalla o documentos directamente a tus tareas para mantener todo en un solo lugar.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-6 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Acceso Total</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Sincroniza tus pendientes en todos tus dispositivos. Una interfaz ligera que responde a cualquier pantalla.</p>
        </div>
    </section>
</div>
    )
}
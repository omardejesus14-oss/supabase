"use client";

import Link from "next/link";
import Custom from "./custom";



export default function Pagina() {
        

    return (
        <div className="w-full h-screen flex flex-col bg-[#0b0e14] text-white gap-3">
            
            {/* --- HERO SECTION --- */}
            <main className="flex-1 flex flex-col justify-center items-center px-6 text-center gap-6 mt-20">
                <div className="space-y-2 flex flex-col gap-3">
                    <span className="text-blue-500 font-bold uppercase tracking-widest text-xl">
                        Bienvenido a GameStack
                    </span>
                  
                    <p className="text-gray-400 max-w-lg mx-auto text-lg">
                        Explora miles de títulos, gestiona tu biblioteca y descubre los juegos que están marcando tendencia hoy mismo.
                    </p>
                </div>

                {/* --- BOTONES --- */}
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                    <Link 
                        href="/login" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
                    >
                        Iniciar Sesión
                    </Link>
                    <Link 
                        href="/register" 
                        className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold px-8 py-3 rounded-lg transition-all"
                    >
                        Crear Cuenta
                    </Link>
                </div>
            </main>

        
            <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-12 mb-20">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors">
                    <div className="text-3xl mb-4"></div>
                    <h3 className="text-xl font-bold mb-2">Catálogo RAWG</h3>
                    <p className="text-gray-400 text-sm">Acceso a la base de datos más completa con miles de juegos y detalles técnicos.</p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors">
                    <div className="text-3xl mb-4"></div>
                    <h3 className="text-xl font-bold mb-2">Búsqueda Rápida</h3>
                    <p className="text-gray-400 text-sm">Filtra por nombre, género o etiquetas para encontrar exactamente lo que buscas.</p>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors">
                    <div className="text-3xl mb-4"></div>
                    <h3 className="text-xl font-bold mb-2">Responsive</h3>
                    <p className="text-gray-400 text-sm">Diseñado para que puedas navegar desde tu PC o desde la palma de tu mano.</p>
                </div>
            </section>

            
            
        </div>
    )
}
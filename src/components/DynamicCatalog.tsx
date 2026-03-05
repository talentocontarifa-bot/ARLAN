"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { X } from "lucide-react";

export default function DynamicCatalog() {
    const [catalog, setCatalog] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                // Fetch up to 6 latest items for the homepage catalog
                const q = query(collection(db, "catalog"), orderBy("createdAt", "desc"), limit(6));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setCatalog(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                } else {
                    setCatalog([]);
                }
            } catch (err) {
                console.error("No se pudo cargar el catálogo de Firebase", err);
                setCatalog([]);
            }
        };
        fetchCatalog();
    }, []);

    // Prevent scrolling when popup is open
    useEffect(() => {
        if (selectedItem) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [selectedItem]);

    // Keyboard ESC to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedItem(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (catalog.length === 0) {
        return (
            <div className="text-center py-20 text-arlan-truffle space-y-4 col-span-full">
                <p className="font-heading text-2xl">Mobiliario PRÓXIMAMENTE</p>
                <p className="font-light text-sm uppercase tracking-widest">Sección en construcción</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {catalog.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative aspect-square rounded-[2rem] overflow-hidden bg-arlan-linen shadow-xl cursor-pointer ${index % 3 === 1 ? 'md:-translate-y-8' : ''}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-arlan-espresso/80 via-transparent to-transparent z-10" />
                        <Image
                            src={item.url}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute bottom-8 left-8 z-20">
                            <h3 className="text-white text-3xl font-heading mb-2">{item.name}</h3>
                            <p className="text-white/80 font-sans text-[10px] tracking-widest uppercase">
                                {item.category || "Explorar pieza"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div
                    className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center backdrop-blur-md p-4 md:p-8"
                    onClick={() => setSelectedItem(null)}
                >
                    <button className="absolute top-6 right-6 text-white hover:text-arlan-wheat transition-colors backdrop-blur-md bg-white/10 p-2 rounded-full cursor-pointer z-10">
                        <X size={32} />
                    </button>

                    <div
                        className="bg-arlan-linen w-full max-w-5xl max-h-[90vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative touch-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Imagen a la izquierda */}
                        <div className="relative w-full md:w-1/2 h-64 md:h-auto md:min-h-[500px] bg-arlan-espresso/5">
                            <Image
                                src={selectedItem.url}
                                alt={selectedItem.name}
                                fill
                                className="object-cover pointer-events-none"
                                priority
                            />
                        </div>

                        {/* Detalles a la derecha */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                            <div className="space-y-6">
                                <div>
                                    <span className="text-arlan-sand font-bold text-[10px] tracking-widest uppercase mb-2 block">
                                        {selectedItem.category}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-arlan-espresso">
                                        {selectedItem.name}
                                    </h2>
                                </div>

                                <div className="w-12 h-0.5 bg-arlan-truffle/20" />

                                <p className="text-arlan-truffle font-light text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                    {selectedItem.description || "Pieza exclusiva de la colección ARLAN Studio."}
                                </p>

                                <div className="pt-8">
                                    <a
                                        href={`https://wa.me/5213331720331?text=Hola, me interesa la pieza: ${selectedItem.name} del catálogo de Mobiliario.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-arlan-espresso text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-arlan-willow transition-colors"
                                    >
                                        Cotizar esta pieza
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

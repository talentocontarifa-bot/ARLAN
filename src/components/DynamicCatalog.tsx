"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DynamicCatalog() {
    const [catalog, setCatalog] = useState<any[]>([]);

    const defaultCatalog = [
        { id: '1', name: "Sillería", url: "/mobiliario/silleria.png" },
        { id: '2', name: "Inflables", url: "/mobiliario/inflable.png" },
        { id: '3', name: "Salas & Bancos", url: "/mobiliario/mesas_y_bancos.png" }
    ];

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                // Fetch up to 6 latest items for the homepage catalog
                const q = query(collection(db, "catalog"), orderBy("createdAt", "desc"), limit(6));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setCatalog(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                } else {
                    setCatalog(defaultCatalog);
                }
            } catch (err) {
                console.error("No se pudo cargar el catálogo de Firebase", err);
                setCatalog(defaultCatalog);
            }
        };
        fetchCatalog();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {catalog.map((item, index) => (
                <div
                    key={item.id}
                    className={`group relative aspect-square rounded-[2rem] overflow-hidden bg-arlan-linen shadow-xl ${index % 3 === 1 ? 'md:-translate-y-8' : ''}`}
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
    );
}

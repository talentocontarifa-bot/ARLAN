"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        fecha: "",
        tema: "",
        ninos: "",
        detalles: ""
    });

    const [needs, setNeeds] = useState({
        "Globos": false,
        "Inflable": false,
        "Mobiliario": false,
        "Caballetes para pintar": false,
        "Espejo de bienvenida": false,
        "Paquete": false
    });

    const handleCheckboxConfig = (key: string) => {
        setNeeds(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const buildMessage = () => {
        const selectedNeeds = Object.entries(needs)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(", ");

        return `¡Hola Arlan!\n\nMe interesa cotizar un evento.\n\n` +
            `*Nombre:* ${formData.name}\n` +
            `*Teléfono:* ${formData.phone}\n` +
            `*Email:* ${formData.email}\n` +
            `*Fecha del Evento:* ${formData.fecha || 'No especificada'}\n` +
            `*Necesito:* ${selectedNeeds || 'No especificado'}\n` +
            `*Tema de la decoración:* ${formData.tema || 'No aplicable'}\n` +
            `*Cantidad de niños:* ${formData.ninos || 'No especificado'}\n` +
            `*Detalles:* ${formData.detalles}`;
    };

    const handleSubmitWA = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const message = buildMessage();
        const waLink = "https://wa.me/5213331720331?text=" + encodeURIComponent(message);
        window.open(waLink, '_blank');
    };

    const handleSubmitEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const message = buildMessage();
        const mailtoLink = "mailto:arlan_balloon@gmail.com?subject=Nueva solicitud de Cotización&body=" + encodeURIComponent(message);
        window.location.href = mailtoLink;
    };

    return (
        <div className="min-h-screen flex flex-col bg-arlan-linen text-arlan-espresso font-sans">
            <Navbar />

            <main className="flex-grow pt-20">

                {/* Header */}
                <section className="bg-arlan-truffle/10 py-24 text-center px-4 relative">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <span className="text-arlan-hazelnut font-sans tracking-[0.4em] uppercase text-xs">Hola</span>
                        <h1 className="text-5xl md:text-6xl font-serif text-arlan-espresso">Hablemos de tus <br /> Planes</h1>
                        <p className="text-arlan-hazelnut max-w-lg mx-auto font-light text-lg">
                            Nos encantaría ser parte de tu historia. Déjanos tus datos y nos pondremos en contacto contigo lo antes posible.
                        </p>
                    </div>
                </section>

                <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-24">

                    <div className="space-y-16">
                        <div className="space-y-12">
                            <h2 className="text-4xl font-heading font-medium text-[#F7F1E5] mb-8 border-b-2 border-[#F7F1E5]/30 pb-4 inline-block tracking-tight">Directorio</h2>
                            <div className="space-y-10 text-[#F7F1E5]/80">
                                <div className="flex items-start gap-8 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#F7F1E5]/10 flex items-center justify-center text-xl shadow-lg border border-[#F7F1E5]/20 shrink-0 group-hover:bg-[#F7F1E5] group-hover:text-arlan-espresso transition-all duration-300">
                                        📍
                                    </div>
                                    <div className="space-y-2 pt-1 border-l-2 border-transparent group-hover:border-[#F7F1E5] pl-4 transition-all duration-300">
                                        <h3 className="font-bold text-[#F7F1E5] uppercase tracking-[0.2em] text-[10px]">Showroom & Oficinas</h3>
                                        <p className="font-light text-sm leading-relaxed text-balance">
                                            Zapopan <br />
                                            Jalisco, México, 45060<br />
                                            <span className="italic text-[10px] uppercase text-[#F7F1E5]/60 tracking-widest mt-2 block">Atención con previa cita.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-8 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#F7F1E5]/10 flex items-center justify-center text-xl shadow-lg border border-[#F7F1E5]/20 shrink-0 group-hover:bg-[#F7F1E5] group-hover:text-arlan-espresso transition-all duration-300">
                                        📞
                                    </div>
                                    <div className="space-y-2 pt-1 border-l-2 border-transparent group-hover:border-[#F7F1E5] pl-4 transition-all duration-300">
                                        <h3 className="font-bold text-[#F7F1E5] uppercase tracking-[0.2em] text-[10px]">Atención Personalizada</h3>
                                        <p className="font-light hover:text-white transition-colors text-lg flex items-center gap-2">
                                            <a href="https://wa.me/5213331720331" target="_blank" rel="noopener noreferrer">+52 1 33 3172 0331</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-8 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#F7F1E5]/10 flex items-center justify-center text-xl shadow-lg border border-[#F7F1E5]/20 shrink-0 group-hover:bg-[#F7F1E5] group-hover:text-arlan-espresso transition-all duration-300">
                                        ✉️
                                    </div>
                                    <div className="space-y-2 pt-1 border-l-2 border-transparent group-hover:border-[#F7F1E5] pl-4 transition-all duration-300">
                                        <h3 className="font-bold text-[#F7F1E5] uppercase tracking-[0.2em] text-[10px]">Email</h3>
                                        <p className="font-light hover:text-white transition-colors text-lg">
                                            <a href="mailto:arlan_balloon@gmail.com">arlan_balloon@gmail.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-gradient-to-br from-arlan-wheat/30 to-white/50 rounded-[2.5rem] border border-arlan-wheat/40 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-xl font-heading font-medium text-arlan-espresso mb-4 relative z-10">Servicio Boutique</h3>
                            <p className="text-arlan-hazelnut font-light text-sm leading-relaxed relative z-10">
                                "Más que rentar mobiliario, ayudamos a construir el escenario perfecto para celebrar los mejores momentos de la vida, priorizando siempre la excelencia y exclusividad."
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(42,36,33,0.1)] border border-arlan-linen flex flex-col justify-center">
                        <h2 className="text-4xl font-heading font-medium text-arlan-espresso mb-10">Cuéntanos más</h2>
                        <form className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Nombre Completo</label>
                                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" placeholder="Tu nombre" required />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">WhatsApp / Teléfono</label>
                                    <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" placeholder="(55) 1234 5678" required />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                                <div className="space-y-3">
                                    <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Correo Electrónico</label>
                                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" placeholder="tucorreo@ejemplo.com" required />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="fecha" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Fecha del Evento</label>
                                    <input type="date" id="fecha" value={formData.fecha} onChange={handleInputChange} className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" required />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                                <div className="space-y-3">
                                    <label htmlFor="ninos" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Cantidad de niños</label>
                                    <input type="number" id="ninos" value={formData.ninos} onChange={handleInputChange} className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" placeholder="Ej: 15" />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="tema" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Tema de decoración</label>
                                    <input type="text" id="tema" value={formData.tema} onChange={handleInputChange} className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" placeholder="Ej: Safari, Princesas..." />
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">¿Qué servicios te interesan?</label>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.keys(needs).map((key) => (
                                        <label key={key} className="flex items-center space-x-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer sr-only"
                                                    checked={needs[key as keyof typeof needs]}
                                                    onChange={() => handleCheckboxConfig(key)}
                                                />
                                                <div className="w-5 h-5 rounded border border-arlan-truffle/30 flex items-center justify-center bg-white peer-checked:bg-arlan-willow peer-checked:border-arlan-willow transition-colors">
                                                    <svg className={`w-3 h-3 text-white ${needs[key as keyof typeof needs] ? 'opacity-100' : 'opacity-0'} transition-opacity`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-sm text-arlan-espresso font-medium group-hover:text-arlan-willow transition-colors">{key}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <label htmlFor="detalles" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Detalles adicionales</label>
                                <textarea id="detalles" value={formData.detalles} onChange={handleInputChange} rows={3} className="w-full bg-arlan-linen/30 border-none p-6 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[2rem] resize-none" placeholder="Horarios, inquietudes extra..."></textarea>
                            </div>

                            <div className="pt-6 space-y-4">
                                <button type="button" onClick={handleSubmitWA} className="w-full flex items-center justify-center gap-3 bg-arlan-espresso text-white font-bold py-5 rounded-full hover:bg-arlan-willow transition-all duration-500 shadow-2xl uppercase tracking-[0.2em] text-[10px]">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                    </svg>
                                    Enviar por WhatsApp
                                </button>
                                <button type="button" onClick={handleSubmitEmail} className="w-full bg-transparent text-arlan-truffle hover:text-arlan-espresso font-bold py-4 rounded-full transition-all duration-300 uppercase tracking-[0.2em] text-[10px] border border-arlan-truffle/20 hover:border-arlan-espresso">
                                    O enviar por Correo Electrónico
                                </button>
                            </div>
                        </form>
                    </div>

                </section>

            </main>
            <Footer />
        </div>
    );
}

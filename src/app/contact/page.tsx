
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
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

                    {/* Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-serif text-arlan-espresso mb-8 border-b border-arlan-wheat pb-4 inline-block">Directorio</h2>
                            <div className="space-y-10 text-arlan-hazelnut">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shadow-lg shadow-arlan-truffle/10 shrink-0">
                                        📍
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-arlan-espresso uppercase tracking-widest text-xs">Showroom</h3>
                                        <p className="font-light">CDMX & Sureste Méxicano<br />Atención previa cita.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shadow-lg shadow-arlan-truffle/10 shrink-0">
                                        📞
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-arlan-espresso uppercase tracking-widest text-xs">WhatsApp</h3>
                                        <p className="font-light hover:text-arlan-sand transition-colors">
                                            <a href="tel:+525512345678">+52 (55) 1234 5678</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shadow-lg shadow-arlan-truffle/10 shrink-0">
                                        ✉️
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-arlan-espresso uppercase tracking-widest text-xs">Email</h3>
                                        <p className="font-light hover:text-arlan-sand transition-colors">
                                            <a href="mailto:hola@arlancelebrations.com">hola@arlancelebrations.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-arlan-wheat/20 rounded-[2rem] border border-arlan-wheat/30">
                            <h3 className="text-xl font-serif text-arlan-espresso mb-4">Misión Celebrations</h3>
                            <p className="text-arlan-hazelnut font-light text-sm italic">"Convertir cada espacio en un refugio de alegría y buen diseño, priorizando la calidez humana en cada servicio."</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(42,36,33,0.1)] border border-arlan-linen">
                        <h2 className="text-4xl font-heading font-medium text-arlan-espresso mb-10">Cuéntanos más</h2>
                        <form className="space-y-10">
                            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Nombre Completo</label>
                                    <input type="text" id="name" className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" placeholder="Tu nombre" />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">WhatsApp / Teléfono</label>
                                    <input type="tel" id="phone" className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" placeholder="(55) 1234 5678" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Correo Electrónico</label>
                                <input type="email" id="email" className="w-full bg-arlan-linen/30 border-none p-5 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[1.5rem]" placeholder="tucorreo@ejemplo.com" />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-arlan-truffle ml-4">Detalles del Evento</label>
                                <textarea id="message" rows={5} className="w-full bg-arlan-linen/30 border-none p-6 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-[2rem] resize-none" placeholder="¿Qué piezas te interesan y para qué fecha?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-arlan-espresso text-white font-bold py-6 rounded-full hover:bg-arlan-willow transition-all duration-500 shadow-2xl uppercase tracking-[0.3em] text-[10px]">
                                Enviar Solicitud de Cotización
                            </button>
                        </form>
                    </div>

                </section>

            </main>
            <Footer />
        </div>
    );
}

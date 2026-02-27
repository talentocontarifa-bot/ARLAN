
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function QualityPage() {
    return (
        <div className="min-h-screen flex flex-col bg-arlan-linen text-arlan-espresso font-sans">
            <Navbar />

            <main className="flex-grow pt-20">

                {/* Header */}
                <section className="bg-arlan-willow/10 py-40 text-center px-4 relative overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-[url('/images/hero-2.png')] bg-cover bg-center opacity-5 grayscale" />
                    <div className="relative z-10 space-y-6">
                        <span className="text-arlan-sand font-heading font-bold tracking-[0.5em] uppercase text-[10px]">Filosofía de Trabajo</span>
                        <h1 className="text-6xl md:text-8xl font-heading font-bold text-arlan-espresso tracking-tighter">Calidad <br /> ARLAN</h1>
                        <p className="text-arlan-hazelnut max-w-2xl mx-auto font-light text-xl leading-relaxed">
                            La excelencia no es una opción, es nuestra base operativa.
                        </p>
                    </div>
                </section>

                <section className="py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">

                    <div className="grid md:grid-cols-2 gap-24 items-start">
                        <div className="space-y-6 border-l-[3px] border-arlan-sand pl-12">
                            <h2 className="text-4xl font-heading font-medium text-arlan-espresso">Propósito</h2>
                            <p className="text-arlan-hazelnut font-light text-lg leading-relaxed">
                                Transformar espacios convencionales en experiencias sensoriales únicas a través de una curaduría impecable de mobiliario y un servicio de guante blanco.
                            </p>
                        </div>
                        <div className="space-y-6 border-l-[3px] border-arlan-willow pl-12">
                            <h2 className="text-4xl font-heading font-medium text-arlan-espresso">Nuestra Meta</h2>
                            <p className="text-arlan-hazelnut font-light text-lg leading-relaxed">
                                Liderar el mercado de diseño de eventos boutique en México, siendo reconocidos por nuestra innovación constante y respeto por los materiales naturales.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-20 bg-white p-16 md:p-32 rounded-[5rem] shadow-[0_80px_150px_-30px_rgba(42,36,33,0.12)] border border-arlan-linen">
                        <h2 className="text-5xl font-heading font-medium text-arlan-espresso text-center">Protocolos de Autor</h2>
                        <div className="grid md:grid-cols-2 gap-20">
                            <div className="space-y-6">
                                <div className="flex gap-6 items-center">
                                    <div className="w-12 h-12 bg-arlan-linen rounded-full flex items-center justify-center font-heading font-bold text-arlan-espresso text-sm shadow-inner">01</div>
                                    <h3 className="font-bold uppercase tracking-[0.2em] text-[11px] text-arlan-espresso">Curaduría Técnica</h3>
                                </div>
                                <p className="text-base text-arlan-hazelnut font-light pl-18 leading-relaxed">Inspeccionamos cada pieza bajo estándares de galería de arte antes de cada montaje.</p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-6 items-center">
                                    <div className="w-12 h-12 bg-arlan-linen rounded-full flex items-center justify-center font-heading font-bold text-arlan-espresso text-sm shadow-inner">02</div>
                                    <h3 className="font-bold uppercase tracking-[0.2em] text-[11px] text-arlan-espresso">Logística de Precisión</h3>
                                </div>
                                <p className="text-base text-arlan-hazelnut font-light pl-18 leading-relaxed">Sincronización milimétrica para que el escenario esté listo mucho antes del primer invitado.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

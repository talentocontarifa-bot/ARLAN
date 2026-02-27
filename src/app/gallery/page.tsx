import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryPage() {
    const images = [
        "/images/hero-1.png",
        "/images/hero-2.png",
        "/images/hero-1.png",
        "/images/hero-2.png",
        "/images/hero-1.png",
        "/images/hero-2.png",
    ];

    return (
        <div className="min-h-screen flex flex-col bg-arlan-linen text-arlan-espresso font-sans">
            <Navbar />
            <main className="flex-grow pt-20">
                <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-24 space-y-6">
                        <span className="text-arlan-sand font-sans tracking-[0.4em] uppercase text-xs">Portafolio</span>
                        <h1 className="text-6xl md:text-7xl font-heading font-medium text-arlan-espresso">Escenarios de <br /> Autor</h1>
                        <div className="w-24 h-0.5 bg-arlan-wheat mx-auto mt-10" />
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
                        {images.map((src, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-[3rem] shadow-2xl shadow-arlan-truffle/20 break-inside-avoid">
                                <Image
                                    src={src}
                                    alt={`Proyecto Arlan ${index + 1}`}
                                    width={600}
                                    height={800}
                                    className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-arlan-espresso/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center p-12 text-center backdrop-blur-md">
                                    <span className="bg-arlan-sand text-white text-[10px] px-4 py-1 rounded-full uppercase tracking-widest mb-6 font-bold shadow-lg">Inspiración</span>
                                    <h3 className="text-3xl font-heading font-medium text-white mb-2">Exclusividad</h3>
                                    <p className="text-white/70 text-xs font-bold uppercase tracking-[0.3em]">Arlan Studio</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

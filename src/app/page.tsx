"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Esconder intro despues de 2.5s
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* FULLSCREEN INTRO LOADER */}
      <div
        className={`fixed inset-0 z-[100] bg-arlan-espresso flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${showIntro ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <div className="relative w-72 h-40 md:w-96 md:h-52 animate-float">
          <Image src="/logo-full.svg" alt="ARLAN Logo Full" fill className="object-contain" priority />
        </div>
        <div className="mt-8 overflow-hidden h-8">
          <p className="text-arlan-linen tracking-[0.4em] uppercase text-[10px] md:text-xs font-medium animate-fade-in-up">A la altura de tus sueños</p>
        </div>
      </div>

      <div className={`min-h-screen flex flex-col bg-arlan-linen text-arlan-espresso font-sans transition-opacity duration-1000 delay-500 ${showIntro ? "opacity-0" : "opacity-100"}`}>
        <Navbar />

        <main className="flex-grow">

          {/* HERO SECTION - MODERN ELEGANT SANS */}
          <section className="relative min-h-[95vh] w-full flex items-center justify-center pt-20 overflow-hidden">
            {/* Ambient light effects for depth */}
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-radial from-arlan-sand/30 to-transparent rounded-full blur-[100px] mix-blend-multiply -z-10 animate-float" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-arlan-willow/30 to-transparent rounded-full blur-[100px] mix-blend-multiply -z-10 animate-pulse-slow" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center h-full">

              {/* Left: Text Content */}
              <div className="z-10 space-y-10 order-2 md:order-1 text-center md:text-left">
                <div className="space-y-6">
                  <h2 className="text-arlan-hazelnut font-sans tracking-[0.4em] uppercase text-xs animate-fade-in opacity-80">Mobiliario de Autor</h2>
                  <h1 className="text-6xl md:text-8xl font-heading font-bold text-arlan-espresso leading-[1.1] tracking-tight">
                    A la altura <br />
                    <span className="text-arlan-sand">de tus sueños.</span>
                  </h1>
                  <p className="text-xl text-arlan-hazelnut max-w-lg font-light leading-relaxed">
                    En ARLAN diseñamos atmósferas que reflejan tu estilo, combinando elegancia contemporánea con calidez orgánica para crear escenarios inolvidables.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start pt-4">
                  <Link
                    href="/catalog"
                    className="bg-arlan-willow text-white hover:bg-arlan-espresso px-12 py-4 rounded-full font-heading font-medium transition-all duration-300 shadow-2xl shadow-arlan-willow/20 text-center tracking-wide"
                  >
                    Explorar Catálogo
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-transparent border border-arlan-truffle text-arlan-espresso hover:bg-arlan-linen px-12 py-4 rounded-full font-heading font-medium transition-all duration-300 text-center tracking-wide"
                  >
                    Contáctanos
                  </Link>
                </div>
              </div>

              {/* Right: Feature Image with Modern Composition */}
              <div className="relative h-[45vh] md:h-[65vh] order-1 md:order-2 px-4">
                <div className="absolute inset-0 bg-arlan-wheat/20 rounded-[3rem] transform -rotate-3" />
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(42,36,33,0.3)]">
                  <Image
                    src="/images/hero-1.png"
                    alt="Diseño Exclusivo Arlan"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Modern Accents */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-arlan-sand to-arlan-wheat rounded-[2rem] rotate-12 -z-10 shadow-2xl" />
                <div className="absolute -top-12 -left-8 w-24 h-24 bg-arlan-willow/40 backdrop-blur-3xl rounded-full -z-10 blur-xl" />
              </div>

            </div>
          </section>

          {/* DESIGN PHILOSOPHY */}
          <section className="py-32 bg-white/40">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid md:grid-cols-2 gap-20 items-center">

                <div className="relative flex justify-center order-2 md:order-1">
                  <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                    <div className="aspect-[4/5] bg-arlan-willow rounded-3xl shadow-2xl translate-y-8" />
                    <div className="aspect-[4/5] bg-arlan-sand rounded-3xl shadow-2xl overflow-hidden relative">
                      <Image src="/images/hero-2.png" alt="Detail" fill className="object-cover opacity-80" />
                    </div>
                    <div className="col-span-2 aspect-video bg-arlan-espresso rounded-3xl p-10 flex flex-col justify-end text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <span className="text-arlan-wheat text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Nuestro Enfoque</span>
                      <h3 className="text-4xl font-heading leading-tight font-medium">Mobiliario con <br /> alma propia.</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-10 order-1 md:order-2">
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-6xl font-heading text-arlan-espresso leading-tight font-bold tracking-tight">
                      Elegancia funcional <br /> hecha a medida.
                    </h2>
                    <p className="text-arlan-hazelnut text-xl font-light leading-relaxed max-w-xl">
                      Creemos en la belleza de lo auténtico. Nuestra colección combina materiales nobles con diseños audaces para transformar cualquier espacio en una obra de arte habitable.
                    </p>
                  </div>

                  <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
                    <div className="space-y-4 border-t border-arlan-truffle/20 pt-6">
                      <h4 className="font-heading font-bold text-arlan-sand uppercase tracking-widest text-[11px]">Orgánico</h4>
                      <p className="text-arlan-truffle text-sm leading-relaxed font-light">Maderas certificadas y textiles naturales con tacto premium seleccionados a mano.</p>
                    </div>
                    <div className="space-y-4 border-t border-arlan-truffle/20 pt-6">
                      <h4 className="font-heading font-bold text-arlan-willow uppercase tracking-widest text-[11px]">Exclusivo</h4>
                      <p className="text-arlan-truffle text-sm leading-relaxed font-light">Diseños únicos desarrollados por artesanos especializados para piezas irrepetibles.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>


          {/* PORTFOLIO HIGHLIGHTS */}
          <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-end mb-24 gap-6 relative z-10">
              <div className="space-y-4 relative">
                <span className="text-arlan-sand font-heading font-bold tracking-[0.4em] uppercase text-[10px] block pl-1">Colección Exclusiva</span>
                <h2 className="text-6xl md:text-8xl font-heading font-bold text-arlan-espresso tracking-tighter">
                  Escenarios <br /> <span className="text-transparent border-text-espresso border-2" style={{ WebkitTextStroke: '1px #2A2421', color: 'transparent' }}>inolvidables.</span>
                </h2>
              </div>
              <Link href="/gallery" className="text-arlan-espresso font-heading font-bold text-[10px] uppercase tracking-[0.3em] border-b-2 border-arlan-espresso pb-2 hover:text-arlan-willow hover:border-arlan-willow transition-all">Explorar Portafolio</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group">
                <Image src="/images/hero-1.png" alt="Project" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-arlan-espresso/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group translate-y-12">
                <Image src="/images/hero-2.png" alt="Project" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-arlan-espresso/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group">
                <Image src="/images/hero-1.png" alt="Project" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-arlan-espresso/20 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
          </section>

          {/* CTA - DARK PREMIUM ELEGANT */}
          <section className="py-40 bg-arlan-espresso relative overflow-hidden">
            {/* Subtle glowing elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-arlan-sand/20 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-arlan-willow/10 to-transparent rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />

            <div className="max-w-4xl mx-auto px-4 text-center space-y-12 relative z-10">
              <h2 className="text-6xl md:text-8xl font-heading font-medium text-arlan-linen">Empieza <br /> tu historia.</h2>
              <p className="text-arlan-wheat text-xl font-light tracking-wide">La exclusividad se siente. Nosotros la diseñamos para ti.</p>
              <Link
                href="/contact"
                className="inline-block bg-arlan-linen text-arlan-espresso px-16 py-6 rounded-full font-heading font-bold transition-all duration-500 hover:bg-white hover:scale-105 shadow-[0_20px_50px_-10px_rgba(247,241,229,0.2)] tracking-[0.3em] uppercase text-[10px]"
              >
                Agendar Cita Privada
              </Link>
            </div>
          </section>


        </main>
        <Footer />
      </div>
    </>
  );
}

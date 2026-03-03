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
      {/* FULLSCREEN INTRO LOADER */}
      <div
        onClick={() => setShowIntro(false)}
        className={`fixed inset-0 z-[100] bg-[#A7AD91] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out cursor-pointer ${showIntro ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <div className="relative w-72 h-40 md:w-96 md:h-52 animate-float">
          <Image src="/logo-full.svg" alt="ARLAN Logo Full" fill className="object-contain" priority />
        </div>
        <div className="mt-8 flex items-center justify-center w-full">
          <p className="text-arlan-espresso font-script text-lg md:text-xl font-normal tracking-[0.1em] lowercase text-center leading-loose">
            <span className="inline-block animate-float-1">a la altura</span><br />
            <span className="inline-block animate-float-2">de tus sueños</span>
          </p>
        </div>
        <p className="absolute bottom-8 text-arlan-espresso/60 text-[10px] uppercase font-bold tracking-widest animate-pulse font-sans">Click para entrar</p>
      </div>

      <div className={`min-h-screen flex flex-col bg-[#F7F1E5] text-arlan-espresso font-sans transition-opacity duration-1000 delay-500 ${showIntro ? "opacity-0" : "opacity-100"}`}>
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
                  <div className="relative w-72 h-32 md:w-96 md:h-48 mb-6">
                    <Image src="/slogan.svg" alt="A la altura de tus sueños" fill className="object-contain object-left" priority />
                  </div>
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

              {/* Right: Feature Image without Container */}
              <div className="relative h-[45vh] md:h-[75vh] order-1 md:order-2 px-4 flex justify-center items-center">
                <div className="relative w-full h-full animate-float">
                  <Image
                    src="/images/header.webp"
                    alt="Header Image"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

            </div>
          </section>

          {/* GALLERY MARQUEE */}
          <section className="py-24 bg-arlan-espresso overflow-hidden relative">
            <div className="text-center mb-16 space-y-4 relative z-10">
              <span className="text-arlan-sand font-sans tracking-[0.4em] uppercase text-xs">Exclusividad</span>
              <h2 className="text-5xl md:text-6xl font-heading font-medium text-arlan-linen">Nuestra Colección</h2>
            </div>

            <div className="relative w-full overflow-hidden flex flex-col gap-6">
              {/* Velo difuminado para los bordes del marquee */}
              <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-arlan-espresso to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-arlan-espresso to-transparent z-10" />

              {/* Top Marquee (Left) */}
              <div className="flex w-[200%] md:w-[150%] animate-marquee-left gap-6">
                {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((num, i) => (
                  <div key={i} className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shrink-0 shadow-2xl">
                    <Image src={`/gallery/0${num}.png`} alt={`Gallery ${num}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              {/* Bottom Marquee (Right) */}
              <div className="flex w-[200%] md:w-[150%] animate-marquee-right gap-6">
                {[5, 6, 7, 8, 9, 5, 6, 7, 8, 9].map((num, i) => (
                  <div key={i} className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shrink-0 shadow-2xl">
                    <Image src={`/gallery/0${num}.png`} alt={`Gallery ${num}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-12 relative z-10">
              <Link href="/gallery" className="text-arlan-linen border-b border-arlan-linen pb-2 font-sans uppercase tracking-[0.2em] text-[10px] transition-all duration-300 hover:text-arlan-sand hover:border-arlan-sand">
                Ver Portafolio Completo
              </Link>
            </div>
          </section>

          {/* FURNITURE RENTAL HIGHLIGHTS */}
          <section className="py-32 bg-white/40">
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20">
              <div className="text-center space-y-4">
                <span className="text-arlan-sand font-heading font-bold tracking-[0.4em] uppercase text-[10px]">Catálogo</span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-arlan-espresso tracking-tighter">
                  Renta de Mobiliario
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sillas */}
                <div className="group relative aspect-square rounded-[2rem] overflow-hidden bg-arlan-linen shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-arlan-espresso/80 via-transparent to-transparent z-10" />
                  <Image src="/gallery/02.png" alt="Sillería" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="text-white text-3xl font-heading mb-2">Sillería</h3>
                    <p className="text-white/80 font-sans text-sm tracking-wider uppercase">Explorar categoría</p>
                  </div>
                </div>
                {/* Inflables */}
                <div className="group relative aspect-square rounded-[2rem] overflow-hidden bg-arlan-linen shadow-xl md:-translate-y-8">
                  <div className="absolute inset-0 bg-gradient-to-t from-arlan-espresso/80 via-transparent to-transparent z-10" />
                  <Image src="/gallery/07.png" alt="Inflables" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="text-white text-3xl font-heading mb-2">Inflables</h3>
                    <p className="text-white/80 font-sans text-sm tracking-wider uppercase">Explorar categoría</p>
                  </div>
                </div>
                {/* Banquitos & Salas */}
                <div className="group relative aspect-square rounded-[2rem] overflow-hidden bg-arlan-linen shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-arlan-espresso/80 via-transparent to-transparent z-10" />
                  <Image src="/gallery/09.png" alt="Salas y Bancos" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="text-white text-3xl font-heading mb-2">Salas & Bancos</h3>
                    <p className="text-white/80 font-sans text-sm tracking-wider uppercase">Explorar categoría</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-12">
                <Link href="/catalog" className="text-arlan-espresso border border-arlan-espresso hover:bg-arlan-espresso hover:text-white px-10 py-4 rounded-full font-sans uppercase tracking-[0.2em] text-xs transition-all duration-300">
                  Ver todo el catálogo
                </Link>
              </div>
            </div>
          </section>

          {/* EVENT CTA */}
          <section className="py-32 bg-arlan-sand relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('/gallery/04.png')] opacity-20 bg-cover bg-center mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-arlan-sand via-arlan-sand/80 to-transparent" />

            <div className="relative z-10 max-w-3xl text-center space-y-10 px-4">
              <h2 className="text-6xl md:text-8xl font-heading font-medium text-arlan-espresso leading-tight">
                Háblanos de <br /> <span className="text-white">tu evento.</span>
              </h2>
              <p className="text-arlan-espresso/80 font-sans text-lg max-w-xl mx-auto">
                Materializamos tus ideas en escenarios de primer nivel. Cotiza hoy mismo tu mobiliario o diseño completo.
              </p>
              <Link href="/contact" className="inline-block bg-arlan-espresso text-white px-12 py-5 rounded-full font-sans uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:bg-arlan-willow hover:-translate-y-1 shadow-2xl">
                Solicitar Cotización
              </Link>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}

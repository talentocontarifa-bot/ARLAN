"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function InteractiveMarquee() {
    const [images, setImages] = useState<string[]>([]);

    // Default fallback images from local folder if db is empty or fetching
    const fallbackImages = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => `/gallery/0${num}.png`);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setImages(snapshot.docs.map(doc => doc.data().url));
                } else {
                    setImages(fallbackImages);
                }
            } catch (err) {
                console.error("No se pudo cargar la galería de Firebase", err);
                setImages(fallbackImages);
            }
        };
        fetchGallery();
    }, []);

    // Provide default split for the 2 marquees
    const images1 = images.length > 0 ? images.slice(0, Math.ceil(images.length / 2)) : fallbackImages.slice(0, 5);
    const images2 = images.length > 0 ? images.slice(Math.ceil(images.length / 2)) : fallbackImages.slice(5, 9);
    // Duplicate lists to ensure scrolling effect doesn't break if few images
    const row1 = [...images1, ...images1, ...images1, ...images1];
    const row2 = [...images2, ...images2, ...images2, ...images2];
    const allImages = [...images];

    const [emblaRef1] = useEmblaCarousel({ loop: true, dragFree: true }, [
        AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, direction: "forward" })
    ]);
    const [emblaRef2] = useEmblaCarousel({ loop: true, dragFree: true }, [
        AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, direction: "backward" })
    ]);

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const [lightboxRef, lightboxApi] = useEmblaCarousel({
        loop: true,
        startIndex: lightboxIndex || 0
    });

    useEffect(() => {
        if (lightboxIndex !== null) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [lightboxIndex]);

    useEffect(() => {
        if (lightboxApi && lightboxIndex !== null) {
            lightboxApi.scrollTo(lightboxIndex, true);
        }
    }, [lightboxApi, lightboxIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft' && lightboxApi) lightboxApi.scrollPrev();
            if (e.key === 'ArrowRight' && lightboxApi) lightboxApi.scrollNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxApi, lightboxIndex]);

    const scrollPrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxApi) lightboxApi.scrollPrev();
    }, [lightboxApi]);

    const scrollNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxApi) lightboxApi.scrollNext();
    }, [lightboxApi]);

    return (
        <>
            <div className="relative w-full overflow-hidden flex flex-col gap-6 cursor-grab active:cursor-grabbing pb-10">
                <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#F7F1E5] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#F7F1E5] to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden embla-viewport" ref={emblaRef1}>
                    <div className="flex gap-6 touch-pan-y pl-4">
                        {row1.map((src, i) => {
                            const originalIndex = allImages.indexOf(src) !== -1 ? allImages.indexOf(src) : (i % allImages.length);
                            return (
                                <div
                                    key={i}
                                    onClick={() => setLightboxIndex(originalIndex)}
                                    className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shrink-0 shadow-2xl transition-transform hover:scale-105 cursor-pointer ml-4"
                                >
                                    <Image src={src} alt="Gallery item" fill className="object-cover pointer-events-none" sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="overflow-hidden embla-viewport" ref={emblaRef2}>
                    <div className="flex gap-6 touch-pan-y pl-4">
                        {row2.map((src, i) => {
                            const originalIndex = allImages.indexOf(src) !== -1 ? allImages.indexOf(src) : (i % allImages.length);
                            return (
                                <div
                                    key={i}
                                    onClick={() => setLightboxIndex(originalIndex)}
                                    className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shrink-0 shadow-2xl transition-transform hover:scale-105 cursor-pointer ml-4"
                                >
                                    <Image src={src} alt="Gallery item" fill className="object-cover pointer-events-none" sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-md touch-none"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button className="absolute top-6 right-6 text-white hover:text-arlan-wheat transition-colors backdrop-blur-md bg-white/10 p-2 rounded-full cursor-pointer z-10">
                        <X size={32} />
                    </button>

                    <button onClick={scrollPrev} className="absolute left-4 md:left-12 text-white hover:text-arlan-wheat transition-colors backdrop-blur-md bg-white/10 p-3 rounded-full cursor-pointer z-10 shadow-lg">
                        <ChevronLeft size={32} />
                    </button>

                    <button onClick={scrollNext} className="absolute right-4 md:right-12 text-white hover:text-arlan-wheat transition-colors backdrop-blur-md bg-white/10 p-3 rounded-full cursor-pointer z-10 shadow-lg">
                        <ChevronRight size={32} />
                    </button>

                    <div className="w-full max-w-7xl overflow-hidden embla-viewport h-full cursor-grab active:cursor-grabbing" ref={lightboxRef} onClick={(e) => e.stopPropagation()}>
                        <div className="flex touch-pan-y h-full items-center">
                            {allImages.map((src, idx) => (
                                <div key={idx} className="relative flex-[0_0_100%] h-full flex justify-center items-center py-12 px-4 md:px-24">
                                    <div className="relative w-full h-full max-h-[85vh] animate-fade-in-up rounded-3xl overflow-hidden shadow-2xl bg-arlan-espresso/20">
                                        <Image src={src} alt="Popup" fill className="object-contain pointer-events-none" priority />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

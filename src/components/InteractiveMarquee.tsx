"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { X } from "lucide-react";

export default function InteractiveMarquee() {
    const [emblaRef1] = useEmblaCarousel({ loop: true, dragFree: true }, [
        AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, direction: "forward" })
    ]);
    const [emblaRef2] = useEmblaCarousel({ loop: true, dragFree: true }, [
        AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, direction: "backward" })
    ]);

    const [lightboxImg, setLightboxImg] = useState<string | null>(null);

    const images1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((num) => `/gallery/0${num}.png`);
    const images2 = [5, 6, 7, 8, 9, 5, 6, 7, 8, 9].map((num) => `/gallery/0${num}.png`);

    useEffect(() => {
        if (lightboxImg) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [lightboxImg]);

    return (
        <>
            <div className="relative w-full overflow-hidden flex flex-col gap-6 cursor-grab active:cursor-grabbing pb-10">
                <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#F7F1E5] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#F7F1E5] to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden embla-viewport" ref={emblaRef1}>
                    <div className="flex gap-6 touch-pan-y pl-4">
                        {images1.map((src, i) => (
                            <div
                                key={i}
                                onClick={() => setLightboxImg(src)}
                                className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shrink-0 shadow-2xl transition-transform hover:scale-105 cursor-pointer ml-4"
                            >
                                <Image src={src} alt="Gallery item" fill className="object-cover pointer-events-none" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden embla-viewport" ref={emblaRef2}>
                    <div className="flex gap-6 touch-pan-y pl-4">
                        {images2.map((src, i) => (
                            <div
                                key={i}
                                onClick={() => setLightboxImg(src)}
                                className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shrink-0 shadow-2xl transition-transform hover:scale-105 cursor-pointer ml-4"
                            >
                                <Image src={src} alt="Gallery item" fill className="object-cover pointer-events-none" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {lightboxImg && (
                <div
                    className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setLightboxImg(null)}
                >
                    <button className="absolute top-6 right-6 text-white hover:text-arlan-wheat transition-colors backdrop-blur-md bg-white/10 p-2 rounded-full cursor-pointer z-10">
                        <X size={32} />
                    </button>
                    <div className="relative w-full max-w-5xl h-[85vh] animate-fade-in-up flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
                        <Image src={lightboxImg} alt="Popup" fill className="object-contain" priority />
                    </div>
                </div>
            )}
        </>
    );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-arlan-linen/80 backdrop-blur-md border-b border-arlan-truffle/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <div className="flex-shrink-0 flex items-center h-full">
                        <Link href="/" className="relative h-16 w-32 translate-y-1">
                            <Image
                                src="/logo.svg"
                                alt="ARLAN Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center h-full">
                        <div className="ml-10 flex items-baseline space-x-10">
                            <NavLink href="/">Inicio</NavLink>
                            <NavLink href="/gallery">Galería</NavLink>
                            <NavLink href="/catalog">Catálogo</NavLink>
                            <NavLink href="/contact">Contacto</NavLink>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden items-center h-full">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-3 rounded-xl text-arlan-espresso hover:text-arlan-willow transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-arlan-linen border-t border-arlan-truffle/20 shadow-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Inicio</MobileNavLink>
                        <MobileNavLink href="/gallery" onClick={() => setIsOpen(false)}>Galería</MobileNavLink>
                        <MobileNavLink href="/catalog" onClick={() => setIsOpen(false)}>Catálogo</MobileNavLink>
                        <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>Contacto</MobileNavLink>
                    </div>
                </div>
            )}
        </nav>

    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-arlan-espresso hover:text-arlan-willow px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-arlan-espresso hover:text-arlan-willow block px-3 py-2 rounded-md text-base font-medium transition-colors uppercase tracking-wider font-serif"
        >
            {children}
        </Link>
    );
}

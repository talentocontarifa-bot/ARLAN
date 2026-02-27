import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-arlan-espresso text-arlan-linen py-32 border-t border-arlan-wheat/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start text-center md:text-left">

                    {/* Brand & Policy */}
                    <div className="space-y-8">
                        <div className="relative h-20 w-32 mx-auto md:mx-0 -translate-x-4">
                            <Image src="/logo.svg" alt="ARLAN Logo" fill className="object-contain brightness-0 invert opacity-80" />
                        </div>
                        <p className="text-arlan-truffle text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-light underline-offset-8 decoration-arlan-wheat/20">
                            Transformamos celebraciones en hitos memorables a través de una estética curada y un servicio de excelencia.
                        </p>
                        <Link href="/quality" className="inline-block text-arlan-wheat text-[10px] font-bold uppercase tracking-[0.2em] border-b border-arlan-wheat/30 pb-1 hover:text-white hover:border-white transition-all">
                            Filosofía de Calidad
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8 pt-4">
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.4em] opacity-50">Explorar</h4>
                        <ul className="space-y-4 font-light text-arlan-truffle text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                            <li><Link href="/gallery" className="hover:text-white transition-colors">Galería</Link></li>
                            <li><Link href="/catalog" className="hover:text-white transition-colors">Catálogo de Renta</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contacto Directo</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-8 pt-4">
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.4em] opacity-50">Conexión</h4>
                        <ul className="space-y-4 font-light text-arlan-truffle text-sm">
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <span className="w-1.5 h-1.5 bg-arlan-sand rounded-full" />
                                México & Sureste
                            </li>
                            <li><a href="tel:+525512345678" className="hover:text-white transition-colors">+52 (55) 1234 5678</a></li>
                            <li><a href="mailto:hola@arlan.com" className="hover:text-white transition-colors">hola@arlan.com</a></li>
                            <li className="pt-4 flex justify-center md:justify-start gap-8">
                                <a href="#" className="text-arlan-wheat hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest">IG</a>
                                <a href="#" className="text-arlan-wheat hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest">FB</a>
                                <a href="#" className="text-arlan-wheat hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest">WA</a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="mt-32 pt-8 border-t border-white/5 text-center text-[9px] tracking-[0.5em] text-arlan-truffle uppercase font-medium">
                    &copy; {new Date().getFullYear()} ARLAN Studio. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

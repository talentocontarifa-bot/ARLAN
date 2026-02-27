
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
    { id: 'sillas', name: 'Sillas', image: '/images/hero-1.png' },
    { id: 'mesas', name: 'Mesas', image: '/images/hero-2.png' },
    { id: 'lounge', name: 'Salas Lounge', image: '/images/hero-1.png' },
    { id: 'decor', name: 'Decoración', image: '/images/hero-2.png' },
];

const products = [
    { id: 1, name: 'Silla Crossback Kids', category: 'sillas', image: '/images/hero-1.png', description: 'Madera natural, acabado orgánico.' },
    { id: 2, name: 'Mesa Picnic', category: 'mesas', image: '/images/hero-2.png', description: 'Madera de pino tratada, ideal para exteriores.' },
    { id: 3, name: 'Inflable Pastel', category: 'decor', image: '/images/hero-1.png', description: 'Colores soft, diseño premium de castillo.' },
    { id: 4, name: 'Carpas Tipi', category: 'decor', image: '/images/hero-2.png', description: 'Lino natural, estructura de madera.' },
];

export default function Catalog() {
    return (
        <div className="min-h-screen flex flex-col bg-arlan-linen text-arlan-espresso font-sans">
            <Navbar />

            <main className="flex-grow pt-20">

                {/* Header */}
                <section className="bg-arlan-truffle/10 py-32 text-center px-4">
                    <h1 className="text-6xl font-heading font-medium text-arlan-espresso mb-6">Colección Curada</h1>
                    <p className="text-arlan-hazelnut max-w-2xl mx-auto font-light text-xl">
                        Mobiliario de autor diseñado para elevar tus espacios más importantes.
                    </p>
                </section>

                {/* Categories */}
                <section className="py-12 border-b border-arlan-truffle/10">
                    <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
                        <div className="flex justify-start md:justify-center space-x-8 min-w-max pb-4 md:pb-0">
                            <button className="px-10 py-2 rounded-full border border-arlan-willow bg-arlan-willow text-white font-medium hover:opacity-90 transition-opacity uppercase tracking-widest text-[10px]">
                                Vista General
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className="px-10 py-2 rounded-full border border-arlan-truffle text-arlan-hazelnut hover:border-arlan-willow hover:text-arlan-willow transition-colors uppercase tracking-widest text-[10px] font-medium"
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Product Grid */}
                <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        {products.map((product) => (
                            <div key={product.id} className="group flex flex-col h-full">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_60px_-15px_rgba(42,36,33,0.15)] mb-8">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md text-arlan-espresso text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="px-4 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-heading font-medium text-arlan-espresso group-hover:text-arlan-sand transition-colors mb-3 h-16 flex items-start">
                                        {product.name}
                                    </h3>
                                    <p className="text-base text-arlan-hazelnut font-light line-clamp-3 mb-8 flex-grow">
                                        {product.description}
                                    </p>
                                    <div className="pt-4 border-t border-arlan-truffle/10">
                                        <Link
                                            href={`/contact?product=${encodeURIComponent(product.name)}`}
                                            className="inline-block text-[11px] font-bold uppercase tracking-widest text-arlan-willow hover:text-arlan-espresso transition-all"
                                        >
                                            Solicitar Cotización →
                                        </Link>
                                    </div>
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

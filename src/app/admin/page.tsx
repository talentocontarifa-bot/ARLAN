"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError("Acceso denegado. Verifica tus credenciales.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-arlan-espresso flex flex-col justify-center items-center px-4 font-sans">
            <Link href="/" className="absolute top-8 left-8 text-arlan-truffle hover:text-white transition-colors text-xs tracking-widest uppercase">
                &larr; Volver al sitio
            </Link>

            <div className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-2xl">
                <div className="flex justify-center mb-8 relative h-16 w-32 mx-auto">
                    <Image src="/logo.svg" alt="ARLAN Logo" fill className="object-contain" />
                </div>

                <h1 className="text-2xl font-heading text-center text-arlan-espresso mb-8 tracking-tighter">
                    Portal de Administración
                </h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs text-center rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-arlan-truffle ml-2">Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-arlan-linen/50 border-none p-4 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-2xl"
                            placeholder="director@arlan.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-arlan-truffle ml-2">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-arlan-linen/50 border-none p-4 text-arlan-espresso focus:ring-2 focus:ring-arlan-willow/20 outline-none transition-all rounded-2xl"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-arlan-espresso text-white font-bold py-4 rounded-xl hover:bg-arlan-willow transition-all duration-300 uppercase tracking-widest text-xs mt-4 disabled:opacity-50"
                    >
                        {loading ? "Verificando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
}

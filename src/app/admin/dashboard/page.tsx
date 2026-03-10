"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Trash2, UploadCloud, Image as ImageIcon, Briefcase, Plus, Wand2, SpellCheck } from "lucide-react";
import { processTextWithGemini } from "@/app/actions/gemini";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [tab, setTab] = useState<"gallery" | "catalog">("gallery");
    const router = useRouter();

    const [gallery, setGallery] = useState<any[]>([]);
    const [catalog, setCatalog] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // Form inputs for Catalog
    const [itemName, setItemName] = useState("");
    const [itemCat, setItemCat] = useState("Mobiliario de Autor");
    const [itemDesc, setItemDesc] = useState("");
    const [aiPersonality, setAiPersonality] = useState("");
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const handleAIAssist = async (mode: "spellcheck" | "enhance") => {
        if (!itemDesc.trim()) return alert("Por favor escribe una idea básica primero para que Gemini trabaje.");

        mode === "enhance" ? setIsEnhancing(true) : setIsChecking(true);
        const result = await processTextWithGemini(itemDesc, mode, aiPersonality);
        mode === "enhance" ? setIsEnhancing(false) : setIsChecking(false);

        if (result.error) {
            alert(result.error);
        } else if (result.success && result.text) {
            setItemDesc(result.text);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) router.push("/admin");
            else {
                setUser(currentUser);
                fetchGallery();
                fetchCatalog();
            }
        });
        return () => unsubscribe();
    }, [router]);

    const fetchGallery = async () => {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setGallery(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchCatalog = async () => {
        const q = query(collection(db, "catalog"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setCatalog(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleUploadGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
                (error) => alert(error.message),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(db, "gallery"), {
                        url: downloadURL,
                        filename: file.name,
                        createdAt: serverTimestamp()
                    });
                    fetchGallery();
                }
            );
        }
        setUploading(false);
        setProgress(0);
        e.target.value = "";
    };

    const handleAddCatalogItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fileInput = (e.target as any).image as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (!file || !itemName) return alert("Falta imagen o nombre");

        setUploading(true);
        const storageRef = ref(storage, `catalog/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            (error) => alert(error.message),
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await addDoc(collection(db, "catalog"), {
                    name: itemName,
                    category: itemCat,
                    description: itemDesc,
                    url: downloadURL,
                    filename: file.name,
                    createdAt: serverTimestamp()
                });
                setItemName("");
                setItemDesc("");
                fetchCatalog();
                setUploading(false);
                setProgress(0);
                fileInput.value = "";
            }
        );
    };

    const handleDeleteGallery = async (id: string, filename: string) => {
        if (!confirm("¿Eliminar imagen?")) return;
        try {
            await deleteDoc(doc(db, "gallery", id));
            if (filename) await deleteObject(ref(storage, `gallery/${filename}`));
            fetchGallery();
        } catch (e) { console.error(e) }
    };

    const handleDeleteCatalog = async (id: string, filename: string) => {
        if (!confirm("¿Eliminar pieza de catálogo?")) return;
        try {
            await deleteDoc(doc(db, "catalog", id));
            if (filename) await deleteObject(ref(storage, `catalog/${filename}`));
            fetchCatalog();
        } catch (e) { console.error(e) }
    };

    if (!user) return <div className="min-h-screen bg-arlan-espresso flex justify-center items-center"><div className="animate-spin w-8 h-8 rounded-full border-2 border-white border-t-transparent" /></div>;

    return (
        <div className="min-h-screen bg-[#F7F1E5] font-sans text-arlan-espresso flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-arlan-truffle/10 p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-heading mb-10 tracking-tighter">ARLAN CMS</h2>
                    <nav className="space-y-4">
                        <button
                            onClick={() => setTab("gallery")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${tab === "gallery" ? "bg-arlan-espresso text-white shadow-lg" : "hover:bg-arlan-linen/50 text-arlan-truffle"}`}
                        >
                            <ImageIcon size={18} /> Galería
                        </button>
                        <button
                            onClick={() => setTab("catalog")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${tab === "catalog" ? "bg-arlan-espresso text-white shadow-lg" : "hover:bg-arlan-linen/50 text-arlan-truffle"}`}
                        >
                            <Briefcase size={18} /> Catálogo
                        </button>
                    </nav>
                </div>

                <div className="pt-6 border-t border-arlan-truffle/10">
                    <p className="text-[10px] text-arlan-truffle truncate mb-4">{user.email}</p>
                    <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-bold w-full uppercase tracking-widest transition-colors">
                        <LogOut size={16} /> Salir
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 h-screen overflow-y-auto">
                <header className="mb-10 flex justify-between items-center">
                    <h1 className="text-3xl md:text-4xl font-serif text-arlan-espresso">
                        {tab === "gallery" ? "Gestor de Galería" : "Gestor de Mobiliario"}
                    </h1>
                </header>

                {uploading && (
                    <div className="mb-8 p-4 bg-blue-50 text-blue-800 rounded-2xl flex items-center gap-4 text-sm font-medium border border-blue-100/50">
                        <div className="w-6 h-6 rounded-full border-2 border-blue-800 border-t-transparent animate-spin" />
                        Procesando subida... {Math.round(progress)}%
                    </div>
                )}

                {tab === "gallery" && (
                    <section className="space-y-10">
                        <label className="border-2 border-dashed border-arlan-truffle/30 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white hover:border-arlan-willow transition-all bg-white/50 text-center">
                            <UploadCloud size={48} className="text-arlan-truffle/50" />
                            <div>
                                <h3 className="text-lg font-bold">Subir nuevas fotos</h3>
                                <p className="text-sm font-light text-arlan-truffle">Puedes seleccionar múltiples imágenes a la vez.</p>
                            </div>
                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleUploadGallery} disabled={uploading} />
                        </label>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {gallery.map((img) => (
                                <div key={img.id} className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-sm bg-white border border-arlan-truffle/10">
                                    <Image src={img.url} alt="Gallery image" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <button onClick={() => handleDeleteGallery(img.id, img.filename)} className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-xl">
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {gallery.length === 0 && <p className="text-center text-arlan-truffle col-span-full py-20">No hay fotos en la galería.</p>}
                    </section>
                )}

                {tab === "catalog" && (
                    <section className="space-y-10">
                        <form onSubmit={handleAddCatalogItem} className="bg-white p-8 rounded-3xl shadow-sm border border-arlan-truffle/10 flex flex-col gap-6">
                            <div className="flex flex-col lg:flex-row gap-6 items-end">
                                <div className="flex-1 w-full space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-arlan-truffle ml-2">Nombre de Pieza</label>
                                    <input type="text" required value={itemName} onChange={e => setItemName(e.target.value)} className="w-full bg-[#F7F1E5]/50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-arlan-willow" placeholder="Ej. Silla Avantgarde" />
                                </div>
                                <div className="w-full lg:w-64 space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-arlan-truffle ml-2">Subir Foto Única</label>
                                    <input type="file" name="image" required accept="image/*" className="w-full text-sm text-arlan-truffle file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-arlan-truffle/10 file:text-arlan-espresso hover:file:bg-arlan-truffle/20 file:cursor-pointer p-1" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-2">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-arlan-truffle">Descripción de la Pieza</label>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleAIAssist("spellcheck")}
                                                disabled={isEnhancing || isChecking}
                                                className="text-[10px] font-bold uppercase tracking-widest text-arlan-truffle hover:text-arlan-espresso bg-arlan-linen/50 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                            >
                                                <SpellCheck size={12} className={isChecking ? "animate-pulse border-b-2" : ""} />
                                                {isChecking ? "Corrigiendo..." : "Corregir Ortografía"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleAIAssist("enhance")}
                                                disabled={isEnhancing || isChecking}
                                                className="text-[10px] font-bold uppercase tracking-widest text-[#B59F7C] hover:text-[#8C7A5E] bg-[#F7F1E5] px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                            >
                                                <Wand2 size={12} className={isEnhancing ? "animate-pulse" : ""} />
                                                {isEnhancing ? "Mejorando..." : "Mejorar (Ventas)"}
                                            </button>
                                        </div>
                                    </div>
                                    <textarea rows={2} value={itemDesc} onChange={e => setItemDesc(e.target.value)} disabled={isEnhancing || isChecking} className="w-full bg-[#F7F1E5]/50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-arlan-willow resize-none disabled:opacity-50" placeholder="Escribe ideas sueltas (ej: sillas blancas, muy comodas, madera fina) y dale a la Varita de Gemini..."></textarea>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                    <Wand2 size={16} className="text-arlan-truffle/50 shrink-0" />
                                    <input
                                        type="text"
                                        value={aiPersonality}
                                        onChange={e => setAiPersonality(e.target.value)}
                                        placeholder="Personalizar Tono de la Varita (Ej. 'Escribe un poema épico', 'Habla como vendedor chilango', 'Elegante y francés')"
                                        className="w-full bg-transparent border-none outline-none text-xs text-arlan-espresso placeholder:text-arlan-truffle/50"
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={uploading} className="w-full lg:w-auto self-end h-[52px] bg-arlan-espresso text-white px-8 rounded-2xl flex justify-center items-center gap-2 hover:bg-arlan-willow transition-colors shrink-0 disabled:opacity-50">
                                <Plus size={20} /> Añadir al Catálogo
                            </button>
                        </form>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {catalog.map((item) => (
                                <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-arlan-truffle/10 flex gap-4 p-4 items-center">
                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-arlan-linen shrink-0">
                                        <Image src={item.url} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-arlan-truffle tracking-widest uppercase mb-1 truncate">{item.category}</p>
                                        <h3 className="text-lg font-heading truncate text-arlan-espresso">{item.name}</h3>
                                    </div>
                                    <button onClick={() => handleDeleteCatalog(item.id, item.filename)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {catalog.length === 0 && <p className="text-center text-arlan-truffle py-20">El catálogo está vacío.</p>}
                    </section>
                )}
            </main>
        </div>
    );
}

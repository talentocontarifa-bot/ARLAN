"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function processTextWithGemini(text: string, mode: "spellcheck" | "enhance", personality: string = "") {
    if (!text || text.trim() === "") {
        return { error: "El texto está vacío." };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return { error: "Falta configurar GEMINI_API_KEY en Vercel." };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let prompt = "";

        if (mode === "spellcheck") {
            prompt = `
Toma el siguiente texto y corrige únicamente las faltas de ortografía, puntuación y gramática.
Respeta rigurosamente el estilo, longitud, tono y las ideas del autor. NO agregues adornos ni lenguaje promocional si no está ahí.
Devuelve ÚNICAMENTE la versión corregida.

Texto a corregir: 
"${text}"
`;
        } else {
            prompt = `
Actúa como un publicista experto en ventas para mobiliario premium de lujo de la marca ARLAN Celebrations.
Toma la siguiente descripción, corrige cualquier falta de ortografía, y mejórala radicalmente.

Instrucciones de Personalidad y Tono (si aplica):
${personality ? personality : "Elegante, minimalista, directo, aspiracional y muy profesional."}

Mantén la descripción directa (1-2 párrafos como máximo), sin usar viñetas ni comillas al principio o final. Devuelve ÚNICAMENTE la versión mejorada.

Texto a mejorar: 
"${text}"
`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedText = response.text().trim().replace(/^"|"$/g, ""); // strip quotes if attached

        return { success: true, text: improvedText };
    } catch (e: any) {
        console.error("Gemini API Error:", e);
        return { error: "Hubo un error al contactar a la varita mágica." };
    }
}

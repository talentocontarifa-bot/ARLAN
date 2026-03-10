"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function enhanceDescription(text: string) {
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

        const prompt = `
Actúa como un copywriter experto en ventas para mobiliario premium de lujo de la marca ARLAN Celebrations.
Toma la siguiente descripción, corrige cualquier falta de ortografía, y mejórala para que suene sumamente profesional, atractiva y elegante. Mantén la descripción directa (1-2 párrafos como máximo), sin usar viñetas ni comillas al principio o final. Devuelve ÚNICAMENTE la versión corregida.

Texto a mejorar: 
"${text}"
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedText = response.text().trim().replace(/^"|"$/g, ""); // strip quotes if attached

        return { success: true, text: improvedText };
    } catch (e: any) {
        console.error("Gemini API Error:", e);
        return { error: "Hubo un error al contactar a la varita mágica." };
    }
}

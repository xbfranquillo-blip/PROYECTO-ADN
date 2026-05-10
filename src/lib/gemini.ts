import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = "Actúa como un profesor experto de Agentes de Defensa, Mecanismo y Nutrición. Tu misión es sintetizar información de Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Responde con rigor científico, brevedad y claridad. Cita las fuentes cuando sea posible.";

// Initialize Gemini directly in the frontend as per skill guidelines
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const chatWithAI = async (message: string, history: any[] = []) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(item => ({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.parts?.[0]?.text || item.text || "" }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    return response.text || "No se recibió respuesta de la IA.";
  } catch (error: any) {
    console.error("Client Gemini Error:", error);
    if (error.message?.includes("API key")) {
      throw new Error("Error de configuración de la IA. Por favor, contacta al administrador.");
    }
    throw error;
  }
};

export const generateCaseStudy = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Genera un caso clínico breve sobre ${topic}. Incluye historia, laboratorio y preguntas.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    return response.text || "No se pudo generar el caso clínico.";
  } catch (error) {
    console.error("Client Case Gen Error:", error);
    throw error;
  }
};

import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = "Eres el Tutor Experto del PROYECTO ADN 2026 (Agentes de Defensa, Mecanismo y Nutrición). Tu misión es proporcionar explicaciones precisas, académicas y pedagógicas sobre Microbiología, Parasitología, Virología e Inmunidad. Debes basar tus respuestas estrictamente en la bibliografía clásica: Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Utiliza un tono profesional pero accesible. Responde siempre en español. No inventes datos; si no tienes información sobre un tema específico en estas fuentes, indícalo cordialmente. Este es el sistema legado (ADN 2026) configurado para acceso directo.";

// The platform shims process.env.GEMINI_API_KEY automatically for React/Vite apps
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const chatWithAI = async (message: string, history: any[] = []) => {
  try {
    const contents = [
      ...history.map(item => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: typeof item.parts?.[0]?.text === 'string' ? item.parts[0].text : (item.text || "") }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    if (!response || !response.text) {
      return "El Tutor ADN no pudo generar una respuesta. Por favor, intenta con una pregunta más específica.";
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    const errorMessage = error.message || String(error);
    
    if (errorMessage.includes("403") || errorMessage.includes("PERMISSION_DENIED")) {
      throw new Error(`Acceso Restringido (403). Es posible que el modelo "gemini-3-flash-preview" no esté disponible en tu región o con tu clave actual. Revisa la configuración en AI Studio.`);
    }

    if (errorMessage.includes("API key")) {
      throw new Error("Error de Autenticación: Clave de API no válida o ausente.");
    }
    
    if (errorMessage.includes("quota") || errorMessage.includes("429")) {
      throw new Error("Límite de cuota alcanzado. Espera un momento.");
    }
    
    throw new Error(`Error en el asistente ADN: ${errorMessage}`);
  }
};

export const generateCaseStudy = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Genera un caso clínico sobre: ${topic}. Bibliografía: Murray, Oubiña, Apt Baruch.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    return response.text || "No se pudo generar el caso.";
  } catch (error: any) {
    console.error("Case Generation Error:", error);
    throw new Error("Fallo en la generación del caso clínico.");
  }
};

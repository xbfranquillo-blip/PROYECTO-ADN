import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = "Eres el Tutor Experto del PROYECTO ADN (Agentes de Defensa, Mecanismo y Nutrición). Tu misión es proporcionar explicaciones precisas, académicas y pedagógicas sobre Microbiología, Parasitología, Virología e Inmunidad. Debes basar tus respuestas estrictamente en la bibliografía clásica: Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Utiliza un tono profesional pero accesible. Responde siempre en español. No inventes datos; si no tienes información sobre un tema específico en estas fuentes, indícalo cordialmente.";

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
      return "Lo siento, no pude procesar tu solicitud en este momento.";
    }

    return response.text;
  } catch (error: any) {
    console.error("Detailed Client Gemini Error:", error);
    
    const errorMessage = error.message || String(error);
    
    if (errorMessage.includes("403") || errorMessage.includes("PERMISSION_DENIED")) {
      throw new Error("El sistema de IA está temporalmente restringido (Error 403). Estamos revisando la configuración de acceso.");
    }

    if (errorMessage.includes("API key")) {
      throw new Error("Error de configuración: Clave de API no válida.");
    }
    
    if (errorMessage.includes("quota") || errorMessage.includes("429")) {
      throw new Error("Límite excedido. Reintenta en unos minutos.");
    }
    
    throw new Error(`Error de IA: ${errorMessage}`);
  }
};

export const generateCaseStudy = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Genera un caso clínico breve sobre el tema: ${topic}. Incluye historia clínica, hallazgos de laboratorio y 3 preguntas de razonamiento clínico. Basado en Murray, Oubiña y Apt Baruch.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    return response.text || "No se pudo generar el caso clínico.";
  } catch (error: any) {
    console.error("Client Case Gen Error:", error);
    throw new Error("Error al generar el caso clínico. Reintenta.");
  }
};

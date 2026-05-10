import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

export const chatWithAI = async (message: string, history: any[] = []) => {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not defined");
    }

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [
        { role: 'user', parts: [{ text: "Actúa como un profesor experto de Agentes de Defensa, Mecanismo y Nutrición. Tu misión es sintetizar información de Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Responde con rigor científico, brevedad y claridad. Cita las fuentes cuando sea posible." }]},
        ...history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.parts[0].text }]
        })),
        { role: 'user', parts: [{ text: message }]}
      ]
    });
    
    if (!response || !response.text) {
      throw new Error("No response text from Gemini");
    }
    
    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("API key not valid")) {
      return "Error: La clave de API no es válida. Si estás en Vercel/GitHub, asegúrate de haber configurado GEMINI_API_KEY en las variables de entorno.";
    }
    throw error;
  }
};

export const generateCaseStudy = async (topic: string) => {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not defined");
    }

    const prompt = `Genera un caso clínico breve de parasitología o microbiología sobre ${topic || "un parásito común"}. 
    Incluye: 
    1. Historia clínica (Edad, síntomas, antecedente epidemiológico).
    2. Hallazgos de laboratorio (Hemograma, EPSD).
    3. Preguntas de razonamiento para el alumno (Mecanismo, Diagnóstico, Nutrición).
    Básate en Apt Baruch o Murray.`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    if (!response || !response.text) {
      throw new Error("No response text from Gemini");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini Case Gen Error:", error);
    throw error;
  }
};

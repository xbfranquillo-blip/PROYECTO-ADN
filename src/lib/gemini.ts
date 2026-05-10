import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "undefined" || key.length < 10) {
    console.error("GEMINI_API_KEY is missing or invalid. Please set it in your environment variables.");
    return "NO_API_KEY";
  }
  return key;
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const SYSTEM_INSTRUCTION = "Actúa como un profesor experto de Agentes de Defensa, Mecanismo y Nutrición. Tu misión es sintetizar información de Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Responde con rigor científico, brevedad y claridad. Cita las fuentes cuando sea posible.";

export const chatWithAI = async (message: string, history: any[] = []) => {
  try {
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }]},
      ...(history || []).map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.parts?.[0]?.text || h.text || "" }]
      })),
      { role: 'user', parts: [{ text: message }]}
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents
    });

    return response.text;
  } catch (error: any) {
    console.error("Client Gemini Error:", error);
    throw error;
  }
};

export const generateCaseStudy = async (topic: string) => {
  try {
    const prompt = `Genera un caso clínico breve de parasitología o microbiología sobre ${topic || "un parásito común"}. 
    Incluye: 
    1. Historia clínica (Edad, síntomas, antecedente epidemiológico).
    2. Hallazgos de laboratorio (Hemograma, EPSD).
    3. Preguntas de razonamiento para el alumno (Mecanismo, Diagnóstico, Nutrición).
    Básate en Apt Baruch o Murray.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    return response.text;
  } catch (error) {
    console.error("Client Case Gen Error:", error);
    throw error;
  }
};

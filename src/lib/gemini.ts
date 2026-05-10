import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = "Actúa como un profesor experto de Agentes de Defensa, Mecanismo y Nutrición. Tu misión es sintetizar información de Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Responde con rigor científico, brevedad y claridad. Cita las fuentes cuando sea posible.";

// Initialize Gemini directly in the frontend as per skill guidelines
const aiClient = (() => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn("GEMINI_API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({ apiKey: key || "" });
})();

export const chatWithAI = async (message: string, history: any[] = []) => {
  try {
    const contents = [
      ...history.map(item => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: typeof item.parts?.[0]?.text === 'string' ? item.parts[0].text : (item.text || "") }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    console.log("Calling Gemini with contents:", JSON.stringify(contents));

    const response = await aiClient.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    if (!response || !response.text) {
      console.error("Incomplete response from Gemini:", response);
      return "Lo siento, no pude procesar tu solicitud en este momento.";
    }

    return response.text;
  } catch (error: any) {
    console.error("Detailed Client Gemini Error:", error);
    
    if (error.message?.includes("API key")) {
      throw new Error("Error de configuración: La clave de API no es válida o falta.");
    }
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      throw new Error("Límite de consultas excedido. Por favor, intenta más tarde.");
    }
    if (error.message?.includes("model") && error.message?.includes("not found")) {
      throw new Error("Error de modelo: El modelo solicitado no está disponible.");
    }
    
    throw new Error("Error al conectar con el asistente de IA. Por favor, reintenta.");
  }
};

export const generateCaseStudy = async (topic: string) => {
  try {
    const response = await aiClient.models.generateContent({
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

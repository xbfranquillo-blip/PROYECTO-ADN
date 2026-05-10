const SYSTEM_INSTRUCTION = "Actúa como un profesor experto de Agentes de Defensa, Mecanismo y Nutrición. Tu misión es sintetizar información de Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Responde con rigor científico, brevedad y claridad. Cita las fuentes cuando sea posible.";

// Removing frontend SDK initialization as we move to server proxy

export const chatWithAI = async (message: string, history: any[] = []) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error del servidor: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error: any) {
    console.error("Gemini Proxy Error:", error);
    
    const errorMessage = error.message || String(error);
    
    if (errorMessage.includes("403") || errorMessage.includes("PERMISSION_DENIED")) {
      throw new Error("El sistema de IA está temporalmente restringido (Error 403). Estamos revisando la configuración en el servidor.");
    }
    
    throw new Error(`Error de conexión con el Tutor ADN: ${errorMessage}`);
  }
};

export const generateCaseStudy = async (topic: string) => {
  try {
    const response = await fetch('/api/case-study', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al generar caso clínico');
    }

    const data = await response.json();
    return data.text;
  } catch (error: any) {
    console.error("Case Study Proxy Error:", error);
    throw new Error("Error al consultar al experto. Reintenta.");
  }
};

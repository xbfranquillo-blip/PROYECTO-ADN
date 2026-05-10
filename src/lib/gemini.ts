export const chatWithAI = async (message: string, history: any[] = []) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Error al conectar con el servidor de IA");
    }

    const data = await response.json();
    return data.text;
  } catch (error: any) {
    console.error("Client Gemini Error:", error);
    throw error;
  }
};

export const generateCaseStudy = async (topic: string) => {
  try {
    const response = await fetch("/api/case-study", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Error al generar el caso clínico");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Client Case Gen Error:", error);
    throw error;
  }
};

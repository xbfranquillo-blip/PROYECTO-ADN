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
      throw new Error(errorData.error || "Network response was not ok");
    }

    const data = await response.json();
    return data.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
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
      throw new Error(errorData.error || "Network response was not ok");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini Case Gen Error:", error);
    throw error;
  }
};

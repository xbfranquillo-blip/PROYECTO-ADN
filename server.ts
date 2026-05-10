import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "");

const app = express();
app.use(express.json());

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chat = model.startChat({
      history: (history || []).map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.parts?.[0]?.text || h.text || "" }]
      }))
    });

    const promptContext = "Actúa como un profesor experto de Agentes de Defensa, Mecanismo y Nutrición. Tu misión es sintetizar información de Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Responde con rigor científico, brevedad y claridad. Cita las fuentes cuando sea posible.";
    
    const fullMessage = history && history.length > 0 ? message : `${promptContext}\n\nPregunta: ${message}`;

    const result = await chat.sendMessage(fullMessage);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error: any) {
    console.error("Gemini Server Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

app.post("/api/case-study", async (req, res) => {
  try {
    const { topic } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Genera un caso clínico breve de parasitología o microbiología sobre ${topic || "un parásito común"}. 
    Incluye: 
    1. Historia clínica (Edad, síntomas, antecedente epidemiológico).
    2. Hallazgos de laboratorio (Hemograma, EPSD).
    3. Preguntas de razonamiento para el alumno (Mecanismo, Diagnóstico, Nutrición).
    Básate en Apt Baruch o Murray.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error: any) {
    console.error("Gemini Case Gen Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate case study" });
  }
});

// For Vercel, we only set up Vite or static serving if NOT running as a serverless function
// or we handle it via exports. For simplicity, we keep the logic but export app.

async function setupApp() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

// Setup application (Vite or Static)
setupApp().then(() => {
  // Only start listening if NOT on Vercel
  if (!process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
});

// Export the app for Vercel serverless functions
export default app;

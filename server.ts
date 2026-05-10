import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const contents = [
        { role: 'user', parts: [{ text: "Actúa como un profesor experto de Agentes de Defensa, Mecanismo y Nutrición. Tu misión es sintetizar información de Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Responde con rigor científico, brevedad y claridad. Cita las fuentes cuando sea posible." }]},
        ...history.map((h: any) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.parts?.[0]?.text || h.text || "" }]
        })),
        { role: 'user', parts: [{ text: message }]}
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  app.post("/api/case-study", async (req, res) => {
    try {
      const { topic } = req.body;
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

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Case Gen Error:", error);
      res.status(500).json({ error: "Failed to generate case study" });
    }
  });

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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

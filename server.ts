import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini on server
  const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "");
  const SYSTEM_INSTRUCTION = "Actúa como un profesor experto de Agentes de Defensa, Mecanismo y Nutrición. Tu misión es sintetizar información de Murray (Microbiología), Apt Baruch (Parasitología) y Oubiña (Virología). Responde con rigor científico, brevedad y claridad. Cita las fuentes cuando sea posible.";

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY no configurada en el servidor" });
      }

      console.log("Servidor: Llamando a Gemini 1.5 Flash");
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION
      });

      const contents = [
        ...(history || []).map((item: any) => ({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: typeof item.parts?.[0]?.text === 'string' ? item.parts[0].text : (item.text || "") }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ];

      const result = await model.generateContent({ contents });
      const response = await result.response;
      const text = response.text();

      res.json({ text });
    } catch (error: any) {
      console.error("Error en API /api/chat:", error);
      res.status(500).json({ 
        error: error.message || "Error interno del servidor",
        details: error.toString()
      });
    }
  });

  app.post("/api/case-study", async (req, res) => {
    try {
      const { topic } = req.body;
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION
      });

      const prompt = `Genera un caso clínico breve sobre el tema: ${topic}. Incluye historia clínica, hallazgos de laboratorio y 3 preguntas de razonamiento clínico. Basado en Murray, Oubiña y Apt Baruch.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({ text });
    } catch (error: any) {
      console.error("Error en API /api/case-study:", error);
      res.status(500).json({ error: error.message || "Error al generar caso clínico" });
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
    console.log(`Servidor Tutoria ADN corriendo en http://localhost:${PORT}`);
  });
}

startServer();

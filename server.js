import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log("API KEY:", process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ API key puuttuu .env tiedostosta!");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("✅ Server toimii!");
});

app.post("/summarize", async (req, res) => {
  console.log("➡️ Pyyntö saapui /summarize");

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Teksti puuttuu",
      });
    }

    console.log("📄 Teksti vastaanotettu");

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Tiivistä teksti lyhyesti ja selkeästi suomeksi.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    console.log("✅ OpenAI vastaus saatu");

    res.json({
      summary: response.choices[0].message.content,
    });
  } catch (error) {
    console.log("❌ VIRHE TAPAHTUI:");
    console.log(error); // TÄRKEIN DEBUG

    res.status(500).json({
      error: error.message || "Tuntematon virhe",
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

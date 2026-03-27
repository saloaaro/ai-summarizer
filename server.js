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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

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

    res.json({
      summary: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Virhe summaroinnissa" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

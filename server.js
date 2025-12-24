import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_URL =
  "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: "Message is required" });
  }

  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: userMessage,
      }),
    });

    const data = await response.json();

    let botReply =
      data?.generated_text || "Sorry, I couldn't understand.";

    res.json({ reply: botReply });
  } catch (error) {
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Chatbot server running on port 3000");
});

const blockedWords = ["abuse", "hack", "illegal"];

if (blockedWords.some(word => userMessage.includes(word))) {
  return res.json({
    reply: "I can't help with that. Please ask educational questions 😊"
  });
}


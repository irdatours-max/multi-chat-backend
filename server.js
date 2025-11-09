import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/claude", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/complete",
      {
        model: "claude-v1",
        prompt: req.body.message,
        max_tokens_to_sample: 500
      },
      {
        headers: { Authorization: `Bearer ${process.env.CLAUDE_API_KEY}` }
      }
    );
    res.json({ answer: response.data.completion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "Error Claude" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log(`Servidor Claude listo en puerto ${process.env.PORT}`));


require('dotenv').config();
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

// Endpoint para ChatGPT
app.post('/api/chatgpt', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: message }],
        max_tokens: 500
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    res.json({ answer: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: 'Error ChatGPT' });
  }
});

// Endpoint para Claude
app.post('/api/claude', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(
      'https://api.anthropic.com/v1/complete',
      {
        model: 'claude-v1',
        prompt: message,
        max_tokens_to_sample: 500
      },
      { headers: { Authorization: `Bearer ${process.env.CLAUDE_API_KEY}` } }
    );
    res.json({ answer: response.data.completion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: 'Error Claude' });
  }
});

// Endpoint para Perplexity
app.post('/api/perplexity', async (req, res) => {
  try {
    const { message } = req.body;
    // Ajustar endpoint real si Perplexity ofrece API
    res.json({ answer: "Simulación de respuesta Perplexity" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: 'Error Perplexity' });
  }
});

// Servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor iniciado en puerto ${process.env.PORT || 3000}`);
});

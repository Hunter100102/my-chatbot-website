import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import path from 'path';
import { createReadStream } from 'fs';
import { Audio } from 'openai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to transcribe audio and send message to ChatGPT
app.post('/chat', async (req, res) => {
  try {
    const { audio } = req.body;

    if (!audio) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    const transcript = await transcribeAudio(audio);
    const response = await sendMessageToChatGPT(transcript);

    res.json({ response });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Function to transcribe audio using OpenAI's Audio API
async function transcribeAudio(audioFile) {
  try {
    const file = createReadStream(audioFile.path);
    const { data } = await Audio.transcribe('whisper-1', { file });

    return data.text.trim();
  } catch (error) {
    throw new Error('Failed to transcribe audio');
  }
}

// Function to send message to ChatGPT
async function sendMessageToChatGPT(message) {
  try {
    const response = await fetch(`https://api.openai.com/v1/engines/gpt-3.5-turbo/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Answer in 100 words or less' },
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch response from ChatGPT: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to get response from ChatGPT');
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
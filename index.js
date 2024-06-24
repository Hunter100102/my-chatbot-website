const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your GitHub Pages URL
const corsOptions = {
  origin: 'https://hunter100102.github.io', // Replace with your GitHub Pages URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint for ChatGPT queries
app.post('/query', (req, res) => {
  const { message } = req.body;
  // Implement your logic to handle the message and return a response from ChatGPT
  const reply = `You said: ${message}`;
  res.json({ reply });
});

// Serve index.html for the root route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

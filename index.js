const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from multiple origins
const allowedOrigins = ['http://127.0.0.1:5500', 'https://hunter100102.github.io', 'https://my-chatbot-backend-58eec5b2de4a.herokuapp.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

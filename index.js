// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Use the port provided by Heroku or default to 5000

app.use(express.static('public')); // Serve static files from the 'public' directory

// Endpoint for ChatGPT queries
app.post('/query', (req, res) => {
  // Your code to handle ChatGPT queries
  const { message } = req.body;
  // Implement your logic to handle the message and return a response from ChatGPT
  const reply = `You said: ${message}`;
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors'); // Add this line
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Add this line
app.use(express.static('public'));
app.use(express.json()); // Add this line to parse JSON bodies

// Endpoint for ChatGPT queries
app.post('/query', (req, res) => {
  const { message } = req.body;
  // Implement your logic to handle the message and return a response from ChatGPT
  const reply = `You said: ${message}`;
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

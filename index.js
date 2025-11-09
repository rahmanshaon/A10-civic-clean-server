const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors()); 
app.use(express.json()); 

// --- Simple test route ---
app.get('/', (req, res) => {
  res.send('Civic Clean Server is running!');
});

// --- Start the server ---
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
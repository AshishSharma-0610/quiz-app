const express = require('express');
const axios = require('axios');
const cors = require('cors'); // To handle cross-origin requests
const app = express();
const port = 3000; // You can use any available port

// Enable CORS for all incoming requests
app.use(cors());

// Define the route to get quiz data
app.get('/api/quiz', async (req, res) => {
    try {
        const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
        res.json(response.data); // Send the data to the frontend
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

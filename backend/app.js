const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-recipe', async (req, res) => {
    const ingredients = req.body.ingredients;
    if (!ingredients) return res.status(400).send("Ingredients are required");

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful cooking assistant." },
                    { role: "user", content: `Create a detailed recipe using: ${ingredients}` }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const recipe = response.data.choices[0].message.content;
        res.json({ recipe });

    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send("Error generating recipe");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

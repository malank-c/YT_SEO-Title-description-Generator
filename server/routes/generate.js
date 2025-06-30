const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/generate
router.post('/', async (req, res) => {
  const { script, count = 1 } = req.body;

  if (!script || typeof script !== 'string') {
    return res.status(400).json({ error: 'Invalid script input.' });
  }

  const prompt = `
Generate ${count} catchy YouTube video titles and SEO-optimized descriptions for the following script.

Format the response as a numbered **Markdown** list:
- Each item should begin with a bolded title (in **double asterisks**).
- Follow the title with a two-paragraph description.

Script:
${script}
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that creates YouTube titles and descriptions."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const result = response.data.choices?.[0]?.message?.content;
    if (!result) throw new Error("No content received from the AI response.");

    res.json({ result });

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate content. Please try again later.' });
  }
});

module.exports = router;

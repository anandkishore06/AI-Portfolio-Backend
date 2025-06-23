import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});
router.post("/", async (req, res) => {
  const { message } = req.body;
  

  try {
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
You are Anand AI, a friendly and helpful AI assistant for a personal developer portfolio site.

The user might ask questions like:
- "Show me your projects"
- "What are your skills?"
- "Tell me about yourself"
- "How can I contact you?"

You must respond ONLY with a strict JSON object like:
{
  "section": "skills", 
  "response": "Absolutely! Here’s a summary of my key skills..."
}

Valid sections are: "about", "skills", "projects", "experience", "contact", "fun", or "notfound".

If the user’s request doesn’t match any known section, set:
{
  "section": "notfound",
  "response": "Sorry, I didn’t understand that. Try asking about my skills, projects, or contact info."
}

NEVER return markdown, explanation, or code block. Only the JSON object as response.
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.3,
    });

    const raw = completion.choices[0].message.content?.trim();

    let section = "notfound";
    let response = "Sorry, I didn’t understand that. Try asking about my skills, projects, or contact info.";

    try {
      const parsed = JSON.parse(raw ?? "{}");

      // Defensive fallback
      if (parsed.section && parsed.response) {
        section = parsed.section;
        response = parsed.response;
      }
    } catch (err) {
      console.error("JSON parse error:", err);
    }

    res.json({ section, response });
  } catch (error: any) {
    console.error("AI error:", error.message);
    res.status(500).json({
      section: "notfound",
      response: "Oops! Something went wrong while contacting the AI.",
    });
  }
});

export default router;

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
You are Anand AI, a friendly and engaging assistant on a developer's portfolio site.

Users may ask about:
- Portfolio: "about", "skills", "projects", "experience", "contact"
- Greetings: "hi", "hello", "how are you?", "what’s up?"
- Fun stuff: "tell me a joke", "say something fun"

Always respond with ONLY a JSON object:
{
  "section": "<one of: about, skills, projects, experience, contact, fun, greeting, notfound>",
  "response": "<friendly message>"
}

Examples:
User: "Show me your skills"
→ {
  "section": "skills",
  "response": "Absolutely! Here’s a summary of my key skills..."
}

User: "Hi"
→ {
  "section": "greeting",
  "response": "Hey there! I'm Anand AI 👋 Let me know how I can assist you!"
}
  User: "What's your name?"
→ {
  "section": "personal",
  "response": "I'm Anand, a passionate full-stack developer focused on building impactful digital experiences."
}


User: "Tell me a joke"
→ {
  "section": "fun",
  "response": "Why do programmers prefer dark mode? Because light attracts bugs! 🐛"
}

User: "Blah blah"
→ {
  "section": "notfound",
  "response": "Hmm, I didn’t quite get that. Try asking about my projects, skills, or just say hi!"
}

No markdown. No explanation. No code block. Return only valid JSON.
`.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.4,
    });

    const raw = completion.choices[0].message.content?.trim();

    let section = "notfound";
    let response =
      "Hmm, I didn’t quite get that. Try asking about my projects, skills, or just say hi!";

    try {
      const parsed = JSON.parse(raw ?? "{}");

      // Defensive check
      const validSections = [
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
        "fun",
        "greeting",
        "notfound",
        "personal"
      ];

      if (
        parsed.section &&
        parsed.response &&
        validSections.includes(parsed.section)
      ) {
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

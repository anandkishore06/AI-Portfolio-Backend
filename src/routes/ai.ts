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
You are Anand AI, an intelligent, friendly, and helpful AI on a developer's portfolio site. You serve two types of responses:

1. If the user asks about the developer's **portfolio**, such as:
   - about
   - skills
   - projects
   - experience
   - contact
   - greetings or fun stuff

Then respond ONLY with a JSON object like:
{
  "section": "<one of: about, skills, projects, experience, contact, fun, greeting>",
  "response": "<friendly summary message>"
}

2. If the user's message is a **general or personal question** (e.g., tech questions, jokes, facts, opinions), respond NORMALLY in plain text — just like ChatGPT.

Examples:

User: "Show me your projects"
→ {
  "section": "projects",
  "response": "Sure! Let me show you some of the coolest things I’ve built..."
}

User: "Hi"
→ {
  "section": "greeting",
  "response": "Hey there! I'm Anand AI 👋 Let me know how I can assist you!"
}

User: "What is React?"
→ React is a popular JavaScript library used for building user interfaces...

User: "Tell me something cool about space"
→ Did you know a day on Venus is longer than a year on Venus? 🌌

Always keep your tone warm, fun, and engaging. No markdown or code blocks in responses.
`.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.5,
    });

    const raw = completion.choices[0].message.content?.trim();

    let section = "notfound";
    let response = raw ?? "Hmm, I didn’t quite get that. Try asking about my projects, skills, or just say hi!";

    try {
      const parsed = JSON.parse(raw ?? "{}");

      const validSections = [
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
        "fun",
        "greeting",
      ];

      if (
        parsed.section &&
        parsed.response &&
        validSections.includes(parsed.section)
      ) {
        section = parsed.section;
        response = parsed.response;
      } else {
        // JSON parsed, but doesn't match portfolio pattern
        section = "general";
        response = raw ?? "";
      }
    } catch {
      // Not JSON at all — treat as generic response
      section = "general";
      response = raw ?? "";
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

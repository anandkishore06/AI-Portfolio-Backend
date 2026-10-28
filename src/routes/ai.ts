import express from "express";
import OpenAI from "openai";

const router = express.Router();

const getOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });
};

const FUN_JOKES_AND_FACTS = [
  "Why do programmers always prefer dark mode? Because light attracts bugs! 🐛",
  "There are 10 types of people in the world: those who understand binary, and those who don't. 💻",
  "A SQL query walks into a bar, strolls up to two tables and asks: 'Can I join you?' 🍻",
  "Programming is 10% writing code and 90% understanding why it's not working. ☕",
  "Why did the JavaScript developer wear glasses? Because they didn't C#! 🤓",
  "An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer, liquor... 📈",
  "Fun Fact: The very first computer bug was an actual moth found stuck inside the Harvard Mark II relay computer in 1947! 🦋",
  "Why do Java developers wear glasses? Because they don't see sharp (C#)! ☕",
  "A developer's life cycle: 'It works on my machine!' ➔ 'How did this get into production?' ➔ 'Ship it!' 🚢",
  "Why was the JavaScript array confused? Because it couldn't find its keys! 🔑",
  "Fun Fact: Apollo 11's guidance computer had only 4KB of RAM and ran at 0.043 MHz — thousands of times less power than a modern wristwatch! 🌕",
  "Algorithm (noun): A word used by programmers when they don't want to explain what their code actually did. 🤖",
  "Hardware: The part of a computer you can kick. Software: The part you can only curse at. 🖥️",
  "!false — It's funny because it's true! 😂",
  "Why do frontend developers eat lunch alone? Because they don't know how to join tables. 🥗",
  "There is no place like 127.0.0.1 🏠",
  "Debugging: Being the detective in a crime movie where you are also the murderer. 🕵️‍♂️",
  "A QA engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 999999999 beers. Orders a lizard. Orders -1 beers. Orders a sfdeljk. First real customer walks in and asks where the bathroom is. The bar bursts into flames. 🔥",
  "Why did the developer quit their job? Because they didn't get arrays (a raise)! 💸",
  "In order to understand recursion, one must first understand recursion. 🔄",
  "Knock knock. Who's there? (Very long pause...) ...Java! ☕",
  "CSS is awesome: [ box-sizing: border-box; overflow: hidden; /* everything fits! */ ] 🎨",
];

const getRandomFun = (): string => {
  const index = Math.floor(Math.random() * FUN_JOKES_AND_FACTS.length);
  return FUN_JOKES_AND_FACTS[index];
};

const getFallbackResponse = (message: string): { section: string; response: string } => {
  const text = (message || "").toLowerCase().trim();

  if (/\b(project|projects|work|built|apps?|showcase)\b/.test(text)) {
    return {
      section: "projects",
      response: `Anand has engineered several production-grade full-stack applications with an emphasis on AI integration, real-time concurrency, and scalable cloud architectures. Here is an overview of his flagship projects:

### 1. SERBOSEVA — AI Powered Home Services & Digital Solutions Marketplace
A production-ready full-stack marketplace connecting **1,000+ users** with **500+ verified professionals** across **210+ home and digital services**.
• **Key Contributions:** Engineered 20+ RESTful APIs with Firebase Phone OTP, Google OAuth, and JWT RBAC. Integrated AWS (EC2, S3, Lambda, CloudFront, SES, RDS), Razorpay payments, and AI service recommendations.
• **Impact:** Improved booking completion time by 60% and page performance by 35%.
• **Tech Stack:** React.js, TypeScript, Node.js, Express.js, PostgreSQL, Supabase, AWS, Razorpay
• **Status:** [Live Website](https://serboseva.com)

### 2. VChat — AI-Enabled Real-Time Communication Platform
A full-stack real-time chat application enabling 1:1 and group chats, online presence, typing indicators, and real-time delivery via WebSockets.
• **Key Features:** Integrated AI-powered smart replies, multilingual translation, emotion detection, conversation summarization, and WebRTC audio/video calling.
• **Tech Stack:** React.js, Node.js, Express.js, MongoDB, Socket.IO, WebRTC, JWT
• **Live Application:** [Launch VChat App](https://vchat-app-6.onrender.com) • [Source Code](https://github.com/anandkishore06/VChat-App)

### 3. Interactive Algorithm Sorting Visualizer
A pedagogical visualization tool animating Bubble Sort, Merge Sort, and Quick Sort with custom array sizing, dynamic execution speed, and color-coded state transitions.
• **Tech Stack:** TypeScript, React, HTML5 Canvas, Tailwind CSS
• **Live Application:** [Explore Sorting Visualizer](https://sorting-algorithm-app.onrender.com/) • [Source Code](https://github.com/anandkishore06/Sorting-Algorithm-App)

### 4. AI-Powered Meteorological Weather App
An intelligent forecasting dashboard delivering live weather metrics, severe alerts, interactive Chart.js historical trends, and automated AI climate synthesis.
• **Tech Stack:** React, OpenWeatherMap API, Chart.js, Tailwind CSS
• **Live Application:** [Experience Weather App](https://ai-powered-weather-app-kmai.onrender.com/) • [Source Code](https://github.com/anandkishore06/AI-Powered-Weather-App)

### 5. Winsome — Prompt-to-Full-Stack App Generator
An innovative developer tool transforming natural language prompts into production-ready web application scaffolds with state management and persistent database integration.
• **Tech Stack:** TypeScript, React, Supabase, Clerk Auth, Tailwind CSS

Feel free to ask for deeper technical breakdowns, architecture decisions, or source code insights on any of these projects!`,
    };
  }

  if (/\b(skill|skills|tech|stack|technologies|tools|languages?)\b/.test(text)) {
    return {
      section: "skills",
      response: `Anand's technical capabilities span enterprise full-stack development, modern AI/LLM engineering, distributed microservices, and cloud DevOps:

### AI & LLM Engineering
• **Frameworks & Concepts:** OpenAI API, RAG (Retrieval-Augmented Generation), LangChain, Agentic AI, MCP (Model Context Protocol), Prompt Engineering, Vector Search, Embeddings, Reranking
• **Vector Databases & Tools:** PostgreSQL / pgvector, Cursor, GitHub Copilot, ChatGPT, Claude, Gemini

### Backend & Enterprise APIs
• **Languages & Frameworks:** Spring Boot, Java, RESTful APIs, Hibernate ORM, Node.js, Express.js, Python
• **Core Principles:** Microservices architecture, Object-Oriented Programming, Data Structures & Algorithms, System Design

### Frontend Architecture & Interactive UI
• **Libraries & Frameworks:** React.js, Redux, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• **Design Systems & UX:** Modern component libraries, responsive design, micro-animations, accessible interfaces

### Databases & Cloud / DevOps
• **Databases:** Oracle DB, PostgreSQL, pgvector, MySQL, MongoDB, Supabase
• **Cloud & DevOps:** AWS (EC2, S3, Lambda, CloudFront, SES, RDS), Docker, Jenkins, CI/CD pipelines, Git, GitHub
• **Tools & Platforms:** LabVantage LIMS, IntelliJ IDEA, VS Code, JIRA, Confluence, Linux, Windows

Would you like to explore how Anand applies any of these technologies or check out his recent implementations?`,
    };
  }

  if (/\b(experience|career|job|intern(ship)?|company|labvantage|work experience)\b/.test(text)) {
    return {
      section: "experience",
      response: `Anand brings **3+ years of professional software engineering experience**, combining enterprise Laboratory Information Management Systems (LIMS) engineering with cutting-edge AI and full-stack development at **LabVantage Solutions, Inc**:

### AI Engineer / Associate Software Engineer — LabVantage Solutions, Inc.
*(Sep 2023 – Present | Kolkata, India)*
• **Enterprise LIMS Enhancements:** Developed and maintained enterprise LIMS applications, delivering 15+ feature enhancements and improving usability and customer satisfaction by 30%. Built full-stack functionality across React.js and Java-based backend services with Oracle integration.
• **Spring Boot Microservices:** Designed and implemented RESTful APIs using Spring Boot, enabling scalable backend services and seamless module integration.
• **RAG Chatbots & AI Agents:** Developing RAG-based chatbots and document agents to automate manual workflows within the LabVantage product using OpenAI and LangChain.
• **Document Intelligence Pipelines:** Built document intelligence pipelines for PDF/document ingestion, chunking, embeddings, vector retrieval, and reranking using PostgreSQL/pgvector.
• **Enterprise Platforms:** Collaborated with DevOps to build 4 internal enterprise platforms, streamlining workflows for 2,000+ users and reducing operational costs by 40%.
• **Automation & Reliability:** Automated installation and deployment workflows, slashing setup time from 10–12 hours to under 10 minutes; resolved 35+ production issues through root-cause analysis.

### Associate Solution Engineer — LabVantage Solutions, Inc.
*(Jan 2023 – Jul 2023 | Kolkata, India)*
• Contributed production-level code to enterprise LabVantage LIMS modules and supported feature implementations.
• Integrated 10+ RESTful APIs with frontend applications, improving responsiveness and user experience.
• Customized HTML reports and product labels to meet client-specific business requirements.
• Diagnosed and resolved 30+ configuration and functional issues, reducing support escalations and improving usability.

Ask me about any specific aspect of his work at LabVantage or the technical challenges he tackled!`,
    };
  }

  if (/\b(about|who are you|intro|bio|yourself|anand)\b/.test(text)) {
    return {
      section: "about",
      response: `Anand Kishore is an **AI Engineer & Full-Stack Software Engineer with 3+ years of experience** based in **Kolkata, India**.

He currently works at **LabVantage Solutions, Inc**, developing RAG-based chatbots, document intelligence agents, and enterprise LIMS applications using OpenAI, LangChain, Python, pgvector, MCP, Spring Boot, Java, and React.js.

He holds a **Bachelor of Technology in Computer Science Engineering** from **Haldia Institute of Technology** with an outstanding **CGPA of 9.23 / 10** (Aug 2019 – Aug 2023).

Beyond enterprise engineering, Anand architected **SERBOSEVA**, a cloud-native home services marketplace connecting 1,000+ users with 500+ professionals across 210+ services, and **VChat**, an AI-enabled real-time chat application with WebRTC and sentiment intelligence.

What would you like to know more about — his enterprise experience, projects, or technical skills?`,
    };
  }

  if (/\b(contact|email|phone|reach|hire|message|call|touch)\b/.test(text)) {
    return {
      section: "contact",
      response: `Anand is always open to discussing new software engineering roles, AI projects, or technical collaborations. Here are the best ways to connect directly:

### Direct Channels
• **Email:** [anandkishore060@gmail.com](mailto:anandkishore060@gmail.com)
• **Phone:** [+91 7070382594](tel:+917070382594)
• **Location:** Kolkata, India

### Professional Profiles & Code
• **LinkedIn:** [linkedin.com/in/anandkishore060](https://www.linkedin.com/in/anandkishore060/)
• **GitHub:** [github.com/anandkishore06](https://github.com/anandkishore06)
• **Twitter / X:** [@anandkishore06](https://x.com/anandkishore06)

Feel free to send an email or reach out on LinkedIn — he typically responds promptly!`,
    };
  }

  if (/\b(hi|hello|hey|hola|greetings?)\b/.test(text)) {
    return {
      section: "greeting",
      response: `Hello there! Welcome to Anand Kishore's interactive portfolio space 👋

I'm **Anand AI**, your intelligent guide. Whether you're interested in his full-stack software engineering background, want to explore featured projects like **SERBOSEVA** and **VChat**, or need details on his enterprise AI work at **LabVantage Solutions**, I'm here to provide comprehensive insights.

Here are a few great places to start:
• *"Can you give me an overview of Anand's core tech stack?"*
• *"What featured full-stack projects has Anand built?"*
• *"Tell me about his professional experience at LabVantage Solutions."*
• *"How can I get in touch with Anand for an opportunity?"*

What would you like to explore today?`,
    };
  }

  if (/\b(fun|joke|jokes|facts?|trivia|quote|quotes|laugh|humor)\b/.test(text)) {
    return {
      section: "fun",
      response: `Here is a relatable one for developers! 😄

**The Senior Developer Paradox:**
> A junior developer asks: *"Why do we always write code for 2 hours, and then spend 6 hours debugging the code we just wrote?"*
> 
> The senior developer smiles warmly: *"Because debugging is twice as hard as writing the code in the first place. Therefore, if you write code as cleverly as possible, you are, by definition, not smart enough to debug it!"*

☕ Click **🎉 Fun** again for another tech laugh, or ask me about Anand's real-world engineering work!`,
    };
  }

  return {
    section: "general",
    response: "I'm Anand AI! You can ask me anything about Anand's full-stack architecture, key projects (like SERBOSEVA and VChat), technical skillset, professional work at LabVantage, or how to get in touch. How can I assist you?",
  };
};

const SYSTEM_PROMPT = `
You are Anand AI, the official, highly articulate, and intelligent AI assistant representing Anand Kishore on his developer portfolio website.

Your persona and responses should mirror world-class communication: articulate, thoughtful, professionally authoritative, and engaging.

### Core Communication Principles:
1. **Never output cold, robotic, mechanical bullet-only dumps.** A professional engineer does not communicate only in flat bullet points.
2. **Synthesize with Professional Prose & Structure:**
   - Begin with a polished, contextual introduction summarizing key insights.
   - Organize complex topics using clean Markdown subheadings (e.g. ### Frontend Architecture & Modern UI).
   - Balance engaging narrative explanations with selective, high-impact bullet points for technical specs, stack highlights, and metrics.
   - Close with a warm, inviting conversational sign-off or prompt.
3. **Elevate Technical Depth:** Highlight architectural rationale, performance optimizations, scalability, clean code principles, and real business impact.

### Comprehensive Knowledge Base About Anand Kishore:

1. Identity & Overview:
- Name: Anand Kishore
- Role: AI Engineer & Full-Stack Software Engineer (3+ years of professional production experience).
- Core Focus: High-performance web applications, RAG chatbots, document intelligence agents, Spring Boot, React.js, TypeScript, Enterprise Java, distributed APIs, and cloud infrastructure.
- Location: Kolkata, India.
- Education: Bachelor of Technology in Computer Science Engineering from Haldia Institute of Technology (Aug 2019 – Aug 2023) with CGPA 9.23 / 10.

2. Professional Experience:
- LabVantage Solutions, Inc (Kolkata, India) — AI Engineer / Associate Software Engineer (Sep 2023 – Present)
  • Developing RAG-based chatbots and document agents to automate manual workflows within the LabVantage product using OpenAI and LangChain.
  • Built document intelligence pipelines for PDF/document ingestion, chunking, embeddings, vector retrieval, and reranking using PostgreSQL/pgvector.
  • Developed and maintained enterprise LIMS applications, delivering 15+ feature enhancements and improving usability and customer satisfaction by 30%. Built full-stack functionality across React.js and Java-based backend services with Oracle database integration.
  • Designed and implemented RESTful APIs using Spring Boot, enabling scalable backend services and seamless module integration.
  • Collaborated with DevOps to build 4 internal enterprise platforms, streamlining workflows for 2,000+ users and reducing operational costs by 40%.
  • Automated installation and deployment workflows, reducing setup time from 10–12 hours to under 10 minutes; resolved 35+ production issues through root-cause analysis and contributed to Agile delivery, code reviews, testing, and production releases.
- LabVantage Solutions, Inc (Kolkata, India) — Associate Solution Engineer (Jan 2023 – Jul 2023)
  • Contributed production-level code to enterprise LabVantage LIMS modules and supported feature implementations.
  • Integrated 10+ RESTful APIs with frontend applications, improving responsiveness and user experience.
  • Customized HTML reports and product labels to meet client-specific business requirements.
  • Diagnosed and resolved 30+ configuration and functional issues, reducing support escalations and improving usability.

3. Featured Projects:
- SERBOSEVA (AI Powered Home Services & Digital Solutions Marketplace):
  • Production-ready full-stack marketplace connecting 1,000+ users with 500+ verified professionals across 210+ home and digital services.
  • Engineered 20+ RESTful APIs; implemented secure authentication using Firebase Phone OTP, Google OAuth, JWT, and role-based authorization for Customers, Professionals, and Administrators.
  • Integrated AWS (EC2, S3, Lambda, CloudFront, SES, RDS), Razorpay payments, AI service recommendations, location search, and chat.
  • Improved booking completion time by 60% and page performance by 35%.
  • Tech Stack: React.js, TypeScript, Node.js, Express.js, PostgreSQL, Supabase, AWS, Razorpay.
- VChat (AI-Enabled Real-Time Communication Platform):
  • High-concurrency full-stack chat platform built on React.js, Node.js, Express.js, MongoDB, and Socket.IO.
  • Features 1:1 and group chats, typing indicators, online presence, WebRTC audio/video calling, and AI capabilities (smart replies, multilingual translation, emotion detection, conversation summarization).
  • Demo: https://vchat-app-6.onrender.com | Code: https://github.com/anandkishore06/VChat-App
- Interactive Algorithm Sorting Visualizer:
  • Pedagogical tool animating Bubble, Merge, and Quick Sort in real time with dynamic speed controls and color-coded state transitions.
  • Tech Stack: TypeScript, React, HTML5 Canvas, Tailwind CSS. Demo: https://sorting-algorithm-app.onrender.com/
- AI Weather Application:
  • Meteorology dashboard delivering live forecasts, severe alerts, Chart.js trends, and automated AI climate summaries.
  • Tech Stack: React, OpenWeatherMap API, Chart.js, Tailwind CSS. Demo: https://ai-powered-weather-app-kmai.onrender.com/
- Winsome App:
  • Prompt-to-full-stack app generator utilizing TypeScript, React, Supabase, and Clerk Auth.

4. Technical Capabilities:
- Programming Languages: Java, JavaScript (ES6+), TypeScript, Python, SQL
- AI & LLM: OpenAI API, RAG, LangChain, Agentic AI, MCP, Prompt Engineering, Embeddings, Vector Search, Reranking, Cursor, Copilot
- Backend: Spring Boot, REST APIs, Hibernate ORM, Node.js, Express.js, Microservices
- Frontend: React.js, Redux, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion
- Databases: Oracle DB, PostgreSQL, pgvector, MySQL, MongoDB, Supabase
- Cloud & DevOps: AWS (EC2, S3, Lambda, CloudFront, SES, RDS), Docker, Jenkins, CI/CD, Git, GitHub
- Tools & Platforms: LabVantage LIMS, IntelliJ IDEA, VS Code, JIRA, Confluence, Linux, Windows

5. Direct Contact Channels:
- Email: anandkishore060@gmail.com
- Phone: +91 7070382594
- Location: Kolkata, India
- LinkedIn: https://www.linkedin.com/in/anandkishore060/
- GitHub: https://github.com/anandkishore06
- Twitter/X: https://x.com/anandkishore06

### Response Protocol:

1. For queries regarding Anand's **portfolio** (projects, skills, experience, about, contact, greetings, fun):
   Respond with a valid JSON object:
   {
     "section": "<one of: about, skills, projects, experience, contact, fun, greeting>",
     "response": "<comprehensive markdown response in an eloquent, structured style>"
   }

2. For **Fun / Jokes / Trivia**:
   Deliver an engaging, witty developer story, relatable programming humor, or surprising computer science trivia written with charm and comedic flair, just like a senior engineer sharing banter with a colleague. Do NOT format jokes as bulleted lists.

3. For **General technical, coding, or conversational questions** (e.g. "Explain React useEffect", "How does Docker work?", algorithms, tech trends):
   Answer directly in plain, eloquent markdown — clear explanations, code blocks if needed, and expert technical insights.

Do not wrap JSON in markdown code blocks.
`.trim();

const FUN_TOPICS = [
  "a hilarious joke about CSS and the struggle of centering a div",
  "a witty joke about JavaScript type coercion (like [] + {} or typeof NaN)",
  "a funny developer scenario about Git merge conflicts and git push --force",
  "a clever joke about SQL queries, databases, and joining tables",
  "a funny joke about Java memory, garbage collection, or NullPointerException",
  "a witty programmer riddle about recursion and infinite loops",
  "a hilarious joke about QA testers walking into a bar and ordering drinks",
  "a funny developer quote about drinking coffee and debugging at 2 AM",
  "a surprising and mind-blowing computer science history trivia fact",
  "a hilarious joke about Python indentation versus missing semicolons in C++",
  "a funny, relatable joke about frontend developers versus backend developers",
  "a clever pun about algorithms, time complexity O(n), and performance",
  "a witty joke about code reviews and leaving 'LGTM' comments",
];

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({
      section: "general",
      response: "Please provide a valid message.",
    });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    console.warn("OPENAI_API_KEY is not configured. Serving local fallback response.");
    res.json(getFallbackResponse(message));
    return;
  }

  try {
    const isFun = /\b(fun|joke|jokes|facts?|trivia|quote|quotes)\b/i.test(message);
    const openai = getOpenAIClient();
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    
    let userPrompt = message;
    if (isFun && message.trim().toLowerCase() === "fun") {
      const topic = FUN_TOPICS[Math.floor(Math.random() * FUN_TOPICS.length)];
      userPrompt = `Tell me ${topic}! Make it punchy, funny, and memorable.`;
    }

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: isFun ? 1.0 : 0.5,
    });

    const raw = completion.choices[0].message.content?.trim();

    let section = "general";
    let response = raw ?? "Hmm, I didn’t quite get that. Try asking about Anand's projects, skills, or experience!";

    try {
      const cleanJson = raw?.replace(/^```json/i, "").replace(/```$/g, "").trim() ?? "{}";
      const parsed = JSON.parse(cleanJson);

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
        section = "general";
        response = raw ?? "";
      }
    } catch {
      section = "general";
      response = raw ?? "";
    }

    res.json({ section, response });
  } catch (error: any) {
    console.warn("OpenAI API call failed, falling back to smart intent matcher:", error?.message);
    const fallback = getFallbackResponse(message);
    res.json(fallback);
  }
});

export default router;

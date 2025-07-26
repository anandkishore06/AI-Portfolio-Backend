import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import aiRouter from "./routes/ai";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRouter);

// 🔁 Keep-alive route
app.get("/ping", (req, res) => {
  res.send("Backend is awake!");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

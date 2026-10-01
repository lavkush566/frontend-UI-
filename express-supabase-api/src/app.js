import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Express Supabase API is running"
  });
});

export default app;
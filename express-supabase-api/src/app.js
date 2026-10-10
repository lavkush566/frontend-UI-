import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Express Supabase API is running"
  });
});

export default app;
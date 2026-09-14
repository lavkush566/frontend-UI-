import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

// Load environment variables from the root .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads (essential for req.body)
app.use(express.json());

// Base endpoint for authentication routes
app.use('/api/auth', authRoutes);

// Health check route to test if the server is alive
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running perfectly!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

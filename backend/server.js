import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { serve } from 'inngest/express';
import { connectToDatabase } from './src/configs/db.js';
import { functions, inngest } from './src/configs/inngest.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Inngest endpoints
app.use('/api/inngest', serve({ client: inngest, functions }));

// Test route
app.get('/', (req, res) => {
  res.status(200).json({ msg: "Server live backend 123!" });
});

// Start server
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`🧸 Server running at http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`));
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
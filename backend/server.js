import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { serve } from 'inngest/express';

import { clerkMiddleware } from '@clerk/express'
import { connectToDatabase } from './src/configs/db.js';
import { functions, inngest } from './src/configs/inngest.js';
import chatRouter from './src/routes/chatRoutes.js';
import sesstionRouter from './src/routes/sessionRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// credentials meaning?? =\ server allows a borwser to include cooies on request
app.use(cors());


app.use(clerkMiddleware()) //this adds auth fileds to request object: req.auth()

// Inngest endpoints
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/chat' , chatRouter);
app.use('/api/sessions' , sesstionRouter);

// Test route
app.get('/', (req, res) => {
  req.auth;
  res.status(200).json({ message: "Server live backend 123!" });
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
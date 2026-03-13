import express from 'express'
import { protectRoute } from '../middlewere/protect.js';
import { createSession, endSession, getAvtiveSessions, getMyRecentSessions, getSessionById, joinSession } from '../controllers/sessionController.js';

const sesstionRouter = express.Router();

sesstionRouter.post("/",protectRoute , createSession);
sesstionRouter.get("/active",protectRoute , getAvtiveSessions);
sesstionRouter.get("/my-recent",protectRoute , getMyRecentSessions);


sesstionRouter.get("/:id",protectRoute , getSessionById);
sesstionRouter.post("/:id/join",protectRoute , joinSession);
sesstionRouter.post("/:id/end",protectRoute , endSession);

export default sesstionRouter;
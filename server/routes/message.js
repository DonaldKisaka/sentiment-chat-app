import { Router } from "express";
import { createMessage, getMessages, getMessage } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get('/', getMessages);
messageRouter.get('/:id', getMessage);
messageRouter.post('/', createMessage);

export default messageRouter;
import { Router } from "express";
import { getSentiment } from "../controllers/sentimentController.js";

const sentimentRouter = Router();

sentimentRouter.post('/', analyzeSentimentController);

export default sentimentRouter;
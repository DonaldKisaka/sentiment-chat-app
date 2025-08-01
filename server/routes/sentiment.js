import { Router } from "express";
import analyzeSentimentController from "../controllers/sentimentController.js";

const sentimentRouter = Router();

sentimentRouter.post('/', analyzeSentimentController);

export default sentimentRouter;
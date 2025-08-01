import analyzeSentiment from "../utils/sentimentalService.js";

const analyzeSentimentController = async (req, res, next) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        const sentiment = await analyzeSentiment(message);
        res.status(200).json({
            success: true,
            data: sentiment
        });
    } catch (error) {
        next(error);
    }
}

export default analyzeSentimentController;
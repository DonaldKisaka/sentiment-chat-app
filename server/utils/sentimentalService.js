import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const analyzeSentiment = async (message) => {
    try {
        const response = await client.responses.create({
            model: "gpt-5",
            temperature: 0,
            input: `Analyze the sentiment of this text and respond with exactly one word: positive, negative, or neutral.\n\nText: ${message}`,
        });
        const label = (response.output_text || "").toLowerCase().trim();
        return ["positive", "negative", "neutral"].includes(label) ? label : "neutral";
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        return "neutral";
    }
}

export default analyzeSentiment;
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const analyzeSentiment = async (message) => {
    const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant that performs sentiment analysis on messages. Return only 'positive', 'negative', or 'neutral'."
            },
            {
                role: "user",
                content: `Analyze the sentiment of the following message: ${message}`
            }
        ]
    });
    
    return response.choices[0].message.content.toLowerCase().trim();
}

export default analyzeSentiment ;
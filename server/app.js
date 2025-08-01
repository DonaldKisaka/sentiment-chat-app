import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/mongodb.js";
import sentimentRouter from "./routes/sentiment.js";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());



app.use('/api/sentiment', sentimentRouter);
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    await connectDB();
});
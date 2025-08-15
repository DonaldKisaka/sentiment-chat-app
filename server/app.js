import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/mongodb.js";
import sentimentRouter from "./routes/sentiment.js";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import errorMiddleware from "./middleware/error.middleware.js";
import Message from "./models/Message.js";
import { Server } from "socket.io";
import http from "http";



dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/sentiment', sentimentRouter);
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);

app.use(errorMiddleware);

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

// Event handling
io.on('connection', (socket) => {
    console.log("A user connected");

    socket.on('send_message', async (data) => {
        try {
            const content = data?.content ?? data?.text ?? data?.message;
            const sender = data?.sender ?? data?.userId;
            const receiver = data?.receiver ?? null;
            const sentiment = data?.sentiment ?? 'neutral';
            const clientId = data?.clientId;

            if (!content || !sender) {
                console.log('Invalid payload for send_message:', data);
                return;
            }

            const saved = await Message.create({
                content,
                sender,
                receiver,
                sentiment,
            });

            const populated = await saved.populate(["sender", "receiver"]);

            io.emit('receive_message', { ...populated.toObject(), clientId });
        } catch (error) {
            console.log('Error in sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.id);
    });
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    await connectDB();
});
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/mongodb.js";
import sentimentRouter from "./routes/sentiment.js";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { Server } from "socket.io";
import http from "http";



dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());



app.use('/api/sentiment', sentimentRouter);
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);

app.use(errorMiddleware);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

// Event handling
io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    socket.on('send_message', (data) => {
        console.log('Message received:', data);
        io.emit('receive_message', data);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.id);
    });
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    await connectDB();
});
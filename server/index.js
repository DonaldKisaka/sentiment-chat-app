import express from "express";
import cors from "cors";
import connectDB from "./database/mongodb.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    await connectDB();
});
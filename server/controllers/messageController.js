import Message from "../models/Message.js";

export const createMessage = async (req, res, next) => {
    try {
        const { message, userId } = req.body;

        if (!newMessage || !userId) {
            return res.status(400).json({
                success: false,
                message: "Message and userId are required"
            });
        }

        const newMessage = new Message({
            message,
            userId
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            data: newMessage
        });
    } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
    try {

        const messages = await Message.find().populate("userId");

        res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        next(error);
    }
}

export const getMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id).populate("userId");

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.status(200).json({
            success: true,
            data: message
        });
    } catch (error) {
        next(error);
    }
}
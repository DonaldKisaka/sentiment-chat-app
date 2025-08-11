import Message from "../models/Message.js";

export const createMessage = async (req, res, next) => {
    try {
        const { content, sender, receiver = null, sentiment } = req.body;

        if (!content || !sender) {
            return res.status(400).json({
                success: false,
                message: "Content and sender are required"
            });
        }

        const newMessage = await Message.create({
            content,
            sender,
            receiver,
            sentiment
        });

        const populated = await newMessage.populate(["sender", "receiver"]);

        res.status(201).json({
            success: true,
            data: populated
        });
    } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
    try {

        const messages = await Message.find().populate(["sender", "receiver"]);

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
        const message = await Message.findById(req.params.id).populate(["sender", "receiver"]);

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
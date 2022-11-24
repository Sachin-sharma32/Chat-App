const Message = require("../models/messageModel");

exports.getAllMessages = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const messages = await Message.find({
            conversationId: { $in: [conversationId] },
        });
        res.status(200).json({
            status: "success",
            data: {
                messages,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.updateMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                message,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        await Message.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                message,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.getMessage = async (req, res) => {
    const { id } = req.params;
    try {
        await Message.findById(id);
        res.status(200).json({
            status: "success",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

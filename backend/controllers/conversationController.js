const Conversation = require("../models/conversationModel");

exports.getAllConversations = async (req, res) => {
  const {userId} = req.params
    try {
        const conversations = await Conversation.find({
          members: { $in : [userId]}
        });
        res.status(200).json({
            status: "success",
            data: {
                conversations,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.updateConversation = async (req, res) => {
    const { id } = req.params;
    try {
        const conversation = await Conversation.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            status: "success",
            data: {
                conversation,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.deleteConversation = async (req, res) => {
    const { id } = req.params;
    try {
        await Conversation.findByIdAndDelete(id);
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
exports.createConversation = async (req, res) => {
    try {
        const conversation = await Conversation.create({
            members: [req.body.senderId, req.body.receiverId],
        });
        res.status(200).json({
            status: "success",
            data: {
                conversation,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.getConversation = async (req, res) => {
    const { id } = req.params;
    try {
        const conversation = await Conversation.findById(id);
        res.status(200).json({
            status: "success",
            data:{
              conversation
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

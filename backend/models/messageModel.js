const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversationId: String,
        senderId: String,
        message: String,
        image: String,
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

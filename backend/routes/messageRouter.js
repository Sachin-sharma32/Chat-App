const express = require("express");
const router = express.Router();
const {
    getAllMessages,
    getMessage,
    deleteMessage,
    createMessage,
    updateMessage,
} = require("../controllers/messageController");

// router.route("/:id").delete(deleteMessage).patch(updateMessage).get(getMessage);
router.route("/:conversationId").get(getAllMessages);
router.route("/").post(createMessage);

module.exports = router;

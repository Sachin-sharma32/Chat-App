const express = require("express");
const router = express.Router();
const {
    getAllConversations,
    getConversation,
    deleteConversation,
    createConversation,
    updateConversation,
} = require("../controllers/conversationController");

// router
//     .route("/:id")
//     .delete(deleteConversation)
//     .patch(updateConversation)
//     .get(getConversation);
router.route("/:userId").get(getAllConversations);
router.route("/").post(createConversation);

module.exports = router;

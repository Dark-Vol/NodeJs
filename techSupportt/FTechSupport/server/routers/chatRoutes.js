const express = require("express");
const ChatController = require("../controllers/chatController");

const router = express.Router();

router.post("/ticket", ChatController.createSupportTicket);
router.post("/message", ChatController.createSendMessage);

module.exports = router;
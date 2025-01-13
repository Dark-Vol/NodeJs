const express = require("express");
const ChatController = require("../controllers/chatController");

const router = express.Router();

router.post("/ticket", ChatController.createSupportTicket);

module.exports = router;
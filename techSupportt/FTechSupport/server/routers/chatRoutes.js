const express = require("express");
const ChatController = require("../controllers/chatController");

const router = express.Router();

router.post("/ticket", ChatController.createSupportTicket);
router.post("/closeTicket", ChatController.closeSupportTicket);

/*Сохранение и получение всех сообщениий */
router.post("/message", ChatController.saveMessage);
router.get("/message/:room", ChatController.getMessages);

module.exports = router;
const express = require("express");
const ChatController = require("../controllers/chatController");

const router = express.Router();

router.post("/ticket", ChatController.createSupportTicket);
router.post("/closeTicket", ChatController.closeSupportTicket);
router.get("/ticket/state/:id", ChatController.getStateTicket);

/*Сохранение и получение всех сообщений */
router.post("/message", ChatController.saveMessage);
router.get("/message/:room", ChatController.getMessages);

module.exports = router;

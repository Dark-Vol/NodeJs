const express = require('express');
const ChatController = require('../controllers/chatController');
const router = express.Router();

router.post('/user', ChatController.createUser);
router.post('/support', ChatController.createSupportTicket);

module.exports = router;

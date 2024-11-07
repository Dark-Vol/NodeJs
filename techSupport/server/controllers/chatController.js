const { User, Message, Support } = require("../models/models");

class ChatController {
    static async createUser(req, res) {
        const { email } = req.body;
        try {
            const user = await User.create({ email });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createSupportTicket(req, res) {
        const { title } = req.body;
        try {
            const ticket = await Support.create({ title });
            res.status(201).json(ticket);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ChatController;
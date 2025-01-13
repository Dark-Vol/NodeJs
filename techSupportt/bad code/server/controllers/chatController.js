const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Support  } = require("../models/models");

class ChatController {
    static async createUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json("Введите корректный email и пароль");
        }
        try {
            const existingUser = await User.findOne({ where: { email:email } });
            if (existingUser) {
                return res.status(400).json("Пользователь с таким email уже существует");
            }
            const hashedPassword = await bcrypt.hash(password, 4);
            const user = await User.create({ email:email, password: hashedPassword });
            const token = jwt.sign({ id: user.id, admin: user.admin }, "secret_key", { expiresIn: "24h" });
            return res.status(201).json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async loginUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json("Введите email и пароль");
        }
        try {
            const user = await User.findOne({ where: { email:email } });
            if (!user) {
                return res.status(404).json("Пользователь не найден");
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json("Неверный пароль");
            }
            const token = jwt.sign({ id: user.id, admin: user.admin }, "secret_key", { expiresIn: "24h" });
            return res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async createSupportTicket(req, res) {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json("Название тикета обязательно.");
        }
        try {
            const ticket = await Support.create({ title });
            return res.status(201).json(ticket);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async reloginUser(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Вы не авторизованы" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Токен отсутствует" });
        }
        try {
            const payload = jwt.verify(token, "fandfjn12j1nejdsfan123jn1fjds123");
            const newToken = jwt.sign(payload, "fandfjn12j1nejdsfan123jn1fjds123", { expiresIn: "24h" });
            return res.status(200).json({ token: newToken });
        } catch (error) {
            return res.status(401).json({ message: "Токен недействителен" });
        }
    }
}

module.exports = ChatController;
const express = require("express");
const { Server } = require("socket.io");
const router = require('./routers');
const sequelize = require('./config/db');
const http = require("http");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:4000"],
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());
app.use('/api', router);


io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));
    jwt.verify(token, "secret_key", (err, decoded) => {
        if (err) return next(new Error("Invalid token"));
        socket.user = decoded;
        next();
    });
});

io.on("connection", (socket) => {
    console.log("Подключен", socket.id);
    socket.on("join_room", ({ login }) => {
        const roomName = `room_${login}`;
        socket.join(roomName);
        console.log(`${login} joined ${roomName}`);
    });
    socket.on("send_message", (data, callback) => {
        const { sender, receiver, message } = data;
        const roomName = `room_${receiver}`;
        if (!io.sockets.adapter.rooms.has(roomName)) {
            return callback("Пользователь не в сети");
        }
        io.to(roomName).emit("receive_message", { sender, message });
        callback(null);
    });
    socket.on("disconnect", () => {
        console.log("Отключен");
    });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        server.listen(4000, () => console.log('Server started on port 4000'));
    } catch (error) {
        console.error("Unable to start the server:", error.message);
    }
};

start();
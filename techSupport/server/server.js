const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const sequelize = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const initSockets = require('./socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes);

// Initialize socket events
initSockets(io);

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync error:', err));

server.listen(5000, () => console.log('Server started on port 5000'));

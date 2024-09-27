const http = require('http');
const { userRouter } = require('./src/routes/userRouter');

const ip = '127.0.0.1';
const port = 3000;

const server = http.createServer(userRouter);

server.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}/`);
});
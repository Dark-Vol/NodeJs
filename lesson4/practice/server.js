

const http = require('http')
const userRoutes = require('./routes/userRouter')

const ip = '127.0.0.1'
const port = 3000

const server = http.createServer(userRoutes)

server.listen(port, ip, ()=>'server start')
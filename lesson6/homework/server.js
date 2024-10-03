const http = require('http')
const bankRouter = require('./routes/bankRouter')

const ip = '127.0.0.1'
const port = 3000

const server = http.createServer(bankRouter)

server.listen(port, ip, () => console.log('server start'))
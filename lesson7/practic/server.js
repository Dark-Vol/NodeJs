const http = require('http')
// const  = require('./routes/')

const ip = '127.0.0.1'
const port = 3000

const server = http.createServer()

server.listen(port, ip, () => console.log('server start'))
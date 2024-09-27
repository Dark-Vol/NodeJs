const http = require('http')
const newsRouter = require('./routes/newsRouter')

const ip = '127.0.0.1'
const port = 3000

const server = http.createServer(newsRouter)

server.listen(port, ip, ()=> console.log('server start'))
const express = require('express')
const cors = require('cors')
const router = require('./routes')

const ip = '127.0.0.1'
const port = 3000

const server = express()

server.use(cors()) // Подключение cors политики
server.use(express.json()) // Преобразование байтов в JSON в request
server.use('/api',router)

// use


server.listen(port, ip, () => console.log('server start'))
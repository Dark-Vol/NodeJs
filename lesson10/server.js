require('./models/models')

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const sequelize = require('./config/db')

const ip = '127.0.0.1'
const port = 3000

const server = express()

server.use(cors())
server.use(express.json())
server.use('/api',router)


async function startServer() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(port, ip, () => console.log('server start'))
    } catch(e) {
        console.log('server not started')
        console.log(e)
    }
}

startServer()
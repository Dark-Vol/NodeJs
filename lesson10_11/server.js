require('./models/models')

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const sequelize = require('./config/db')
const fileUpload = require('express-fileupload')
const path = require('path')

const ip = '127.0.0.1'
const port = 3000

const server = express()

server.use(cors())
server.use(express.json())
server.use(fileUpload({}))
server.use('/api',router)
server.use(express.static(path.resolve(__dirname,'static')))


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
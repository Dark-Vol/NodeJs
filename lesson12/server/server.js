const express = require('express')
const {Server} = require('socket.io')
const http = require('http')
const cors = require('cors')

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
})

app.use(cors())
app.use(express.json())
// app.use('/api',router)


server.listen(5000, ()=>console.log('Server start on 5000 PORT'))

io.on('connection', (socket) => {
    console.log("Подключен", socket.id)

    socket.on('disconnect', () =>  {
        console.log("Отключен")
    })

    socket.on('join_room', (name) => {
        socket.join(name) // Создаем комнату сокету с названием пользователя
        console.log('Создата комната под имя',name)
    })

    socket.on('send_message', async (data) => {
        const {sender,receiver,message} = data
        console.log(sender,receiver,message)
        io.to(receiver).emit('receive_message', {sender:sender, message:message})
    })
})

// on     -> connection, send_message, receive_message 
// emit   -> 

/*

    Server
        on -> connection
            user_id -> saveDB

    Client
        emit -> connection(3)

*/
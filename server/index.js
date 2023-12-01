import express from 'express'
import config from './config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import { Server } from "socket.io"
import http from 'http'
import { SocketAddress } from 'net'

const app = express()
const server = http.createServer(app)
//socket server configuration
const io = new Server(server,{
    cors:{
        origin:"*"
    }
})

//connecting mongodb

mongoose.connect('mongodb://0.0.0.0:27017')
const connection = mongoose.connection

connection.once('open', () => {
    console.log('mongodb connection succesfull')
})

//middlewares
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json())

//api Routes
//??????????

//start server
server.listen(config.SERVER_PORT, () => {
    console.log(`server is running on port${config.SERVER_PORT}`)

})

//socket io

io.on('connection', (socket) => {
    console.log(`socket ${socket.id} connected`)


    socket.on("send_message",(data) => {
        console.log('data received in backend through the socket',data)
        
        socket.to(data.room).emit('received',data.message)

    })
    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`)
    })

    socket.on("join_room",(data)=>{
        console.log('joined particular rooom')
        socket.join(data)
    })
})





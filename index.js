const express = require("express")
const { createServer } = require('node:http');
const path = require("path")
const {Server} = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static('/public'))

app.get("/" , (req, res) => {
    return res.sendFile(path.resolve("./public/index.html"))
})

//socket 
io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        io.emit('client-message', message)
    })
});

server.listen(9000, () => console.log("Server started at PORT: 9000"))
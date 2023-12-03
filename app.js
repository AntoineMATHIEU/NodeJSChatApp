const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`server on port:  ${PORT}`))

const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, 'public')))

let sokets = new Set()

io.on('connection', onConnection)

function onConnection(socket) {
    console.log('new connection', socket.id)
    sokets.add(socket.id)

    io.emit('clients-total', sokets.size)

    socket.on('disconnect', () => {
        console.log('disconnected', socket.id)
        sokets.delete(socket.id)
        io.emit('clients-total', sokets.size)
    })
    
    socket.on('message', (data) => {
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
    })

    socket.on('blur', (data) => {
        socket.broadcast.emit('typing', data)
    })

    
}



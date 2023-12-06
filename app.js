const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`server on port:  ${PORT}`))

const historic = []

const io = require('socket.io')(server)

const log = require('./modules/logger')
const calcul = require('./modules/calculatrice')

const BackgroundColor = require('./modules/customisation')
const backgroundColor = new BackgroundColor()



app.use(express.static(path.join(__dirname,'public')))

let sockets = new Set()

io.on('connection', onConnection)


function onConnection(socket) {
    //log connected + socket.id
    log('connected', socket.id)

    sockets.add(socket.id)

    io.emit('clients-total', sockets.size)

    socket.emit('history', historic);

    socket.on('disconnect', () => {
        log('disconnected', socket.id)
        sockets.delete(socket.id)
        io.emit('clients-total', sockets.size)
    })
 
    socket.on('message', (data) => {
        
        //si le message commence par un =, on le calcule
        if(data.message[0] === "=")
        {

            data.message = calcul(data.message)
            //on envoie seulement le  message au client qui l'a envoyé
            io.to(socket.id).emit('chat-message', data);
            log('resultat calcul')            
        }
        else if(data.message[0] === "<")
        {
            log('changement de couleur')
            io.to(socket.id).emit('change-color', backgroundColor.change_color(data.message));
                   
        }
        else
        {
            data.socketId = socket.id
            historic.push(data)
            socket.broadcast.emit('chat-message', data)
            log('message')
            
        }       
    })

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
    })

    socket.on('blur', (data) => {
        socket.broadcast.emit('typing', data)
    })

    
}



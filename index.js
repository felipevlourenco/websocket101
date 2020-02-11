const express = require('express')
const socket = require('socket.io')

// App setup
const app = express()
const server = app.listen(4000, err => {
  if (err) {
    console.log('Something went wrong...')
    return
  }

  console.log('Listening on port 4000...')
})

// Static files
app.use(express.static('public'))

// Socket setup
const io = socket(server)

io.on('connection', connectedSocket => {
  console.log('TCL: connectedSocket', connectedSocket.id)
  console.log('Socket connected!')

  connectedSocket.on('chat-message', data => {
    io.sockets.emit('chat-message', data)
  })

  connectedSocket.on('chat-typing', data => {
    connectedSocket.broadcast.emit('chat-typing', data)
  })
})

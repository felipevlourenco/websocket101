// Make socket connection
const socket = io.connect('http://localhost:4000')

// Query DOM
const message = document.getElementById('message')
const handle = document.getElementById('handle')
const send = document.getElementById('send')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

// Emit events
send.addEventListener('click', () => {
  socket.emit('chat-message', {
    message: message.value,
    handle: handle.value
  })
  message.value = ''
})

message.addEventListener('keypress', () => {
  socket.emit('chat-typing', { handle: handle.value })
})

// Listener for events
socket.on('chat-message', data => {
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`
  feedback.innerHTML = ''
})

socket.on('chat-typing', data => {
  feedback.innerHTML = `<p><em>${data.handle} is typing a message...</em></p>`
})

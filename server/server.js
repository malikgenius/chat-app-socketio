const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

var app = express();


var publicpath = path.join(__dirname, '../public');
console.log(publicpath);

var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicpath));

io.on('connection', (socket2) => {      // (socket) can be called anything ... same socket will be used to check the disconnection of a user as its saved in socket.
  
  console.log(`New user Connected`);
  socket2.on('disconnect', () => {
    console.log(`User disconnected at ${new Date()}`)
  })
});


server.listen(port,() => {
  console.log(`Server is listening on ${port}`)
});

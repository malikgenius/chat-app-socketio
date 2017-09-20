const express = require('express');
const socketIO = require('socket.io');
const path = require('path');     // path library let you use routes outside your folder easily .. good one to use.
const http = require('http');     // http is must with socketio ... better to use this way in all projects.
const {generateMessage} = require('./utils/message');

var publicpath = path.join(__dirname, '../public');
console.log(publicpath);

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicpath));

io.on('connection', (socket) => {      // (socket) can be called anything ... same socket will be used to check the disconnection of a user as its saved in socket.
  console.log(`New user Connected`);
  var clientIp2 = socket.request.connection.remoteAddress;
  console.log(clientIp2);

  // socket.emit('newEmail', {           // emit is used to push data to client or from client server ..
  //   from: "malik@example.com",
  //   text: 'Hi its your Server sending you email !!! '
  // });
  //
  // socket.on('composeEmail', (email) => {      // socket.on will wait and watch for pushed data from client ..
  //   console.log(email);
  // })

  // Welcome user when joined .. only to the user who joined

  socket.emit('newMessage', generateMessage('Admin', `welcome to our chat app, you are coming from ${clientIp2}`))
  // user joined broadcast message to all but the user, which user joined wont get this message
  socket.broadcast.emit('newMessage',generateMessage('Admin', `new user from ${clientIp2} joined, Please welcome`));
  // below is the original one kept for reference ... without function import
  // socket.broadcast.emit('newMessage', {
  //   from: 'Web Admin',
  //   text: `new user from ${clientIp2} joined, Please welcome :)`,
  //   createdAt: new Date().getTime()
  // });

  // clients sending messages to everybody -- broadcast 
  socket.on('createMessage', (message) => {
    //var message;
    //console.log(`message from client to distribute ${message}`);
    console.log(message)
    // Broadcast message to everybody including the sender.
    io.emit('newMessage', generateMessage(message.from, message.text));

    // broadcast message to everybody but the sender .. wont get it--- just for testing, never use in production.
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });


  socket.on('disconnect', () => {
    console.log(`User disconnected at ${new Date()}`)
  });

});


server.listen(port,() => {
  console.log(`Server is listening on ${port}`)
});

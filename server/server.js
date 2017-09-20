const express = require('express');
const socketIO = require('socket.io');
const path = require('path');     // path library let you use routes outside your folder easily .. good one to use.
const http = require('http');     // http is must with socketio ... better to use this way in all projects.

var publicpath = path.join(__dirname, '../public');
console.log(publicpath);

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicpath));

io.on('connection', (socket) => {      // (socket) can be called anything ... same socket will be used to check the disconnection of a user as its saved in socket.
  console.log(`New user Connected`);
  var clientIP = socket.handshake.address;
  //var clientAgent = socket.client.remoteAddress;
  //console.log(clientAgent)
  console.log(clientIP);

  // socket.emit('newEmail', {           // emit is used to push data to client or from client server ..
  //   from: "malik@example.com",
  //   text: 'Hi its your Server sending you email !!! '
  // });
  //
  // socket.on('composeEmail', (email) => {      // socket.on will wait and watch for pushed data from client ..
  //   console.log(email);
  // })

  // Welcome user when joined .. only to the user who joined

  socket.emit('welcomeUser', {
    from: 'Web Admin',
    text: "Welcome User to our chat system!",
    createdAt: new Date().getTime()
  })
  // user joined broadcast message to all but the user, which user joined wont get this message
  socket.broadcast.emit('userJoined', {
    from: 'Web Admin',
    text: `new user from ${clientIP} joined, Please welcome :)`,
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    //var message;
    //console.log(`message from client to distribute ${message}`);
    console.log(message)
    // Broadcast message to everybody including the sender.
    io.emit('newMessage', {     // io.emit will broadcast message to all connected users ....
      from: message.from,     // message.from will give us clear output on console and browser when we use it later.
      text: message.text,
      createdAt: new Date().getTime()
    });

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

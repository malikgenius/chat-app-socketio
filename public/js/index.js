var socket = io();
socket.on('connect', function () {
  console.log('Connected to Server');

});

socket.emit('createMessage', {
  from: 'client1',
  text: 'this is my message please destribute it to others!'
});

socket.on('newMessage', function (message){
  //console.log(`Message from server which was sent from client1 ${message}`)
  console.log(message);
});



socket.on('disconnect', function () {
  console.log(`disconnected from server ${new Date()}`)
});

// socket.on('newEmail', function (email){   // email is the first property sent from server to client .. we need to use it.
//   console.log('New Email', email)
// });
//
// socket.emit('composeEmail', {
//   from:'client@example.com',
//   text:'hay its client !!!'
// });

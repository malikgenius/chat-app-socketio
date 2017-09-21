var socket = io();
socket.on('connect', function () {
  console.log('Connected to Server');
});

socket.on('newMessage', function (message){
  console.log('from: ',message.from, message.text);
  console.log('createdAt: ',message.createdAt);
  //console.log(`Message from server which was sent from client1 ${message}`)
  //console.log(message);
  });


// we can make new call for everything or we can use the same newMessage for all from server. below is disabled as i am using new message.
// when new user joined welcome message for it
// socket.on('welcomeUser', function (message){
//   console.log('from: ',message.from,',', message.text);
//   console.log('createdAt: ',message.createdAt);
// });

// new user connected -- Broadcast message to everybody else but not the user.
// socket.on('userJoined', function (message){
//   console.log('from: ',message.from, message.text);
//   console.log('createdAt: ',message.createdAt);
// });
// socket.emit('createMessage', {
//   from: 'client1',
//   text: 'this is my message please destribute it to others!'
// }, function(callback){    // callback will be received here from server.
//   console.log('Got it', callback);
// });






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

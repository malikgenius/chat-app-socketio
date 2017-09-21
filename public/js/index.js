var socket = io();
socket.on('connect', function () {
  console.log('Connected to Server');
});

socket.on('newMessage', function (message){
  console.log('from: ',message.from, message.text);
  console.log('createdAt: ',message.createdAt);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);

  });


socket.on('disconnect', function () {
  console.log(`disconnected from server ${new Date()}`)
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: jQuery('[name=from]').val(),
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

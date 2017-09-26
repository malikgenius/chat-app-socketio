var socket = io();
socket.on('connect', function () {
  console.log('Connected to Server');
});

socket.on('newMessage', function (message){
  var timeStamp = moment(message.createdAt).format("h:mm a");
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: timeStamp
  });
  jQuery('#messages').append(html);


  // // console.log('from: ',message.from, message.text);
  // // console.log('createdAt: ',message.createdAt);
  // var timeStamp = moment(message.createdAt).format("h:mm a")
  // var li = jQuery('<li></li>');
  // li.text(`${message.from}  ${timeStamp}: ${message.text}`);
  //
  // jQuery('#messages').append(li);

  });

socket.on('newLocationMessage', function (message){
  var timeStamp = moment(message.createdAt).format("h:mm a");
  // var a = jQuery('<a target="_blank">My current Location</a>')
  var template = jQuery('#location-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: timeStamp
  });
  jQuery('#messages').append(html);
  // var timeStamp = moment(message.createdAt).format("h:mm a");
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current Location</a>')
  //
  // li.text(`${message.from} ${timeStamp}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});


socket.on('disconnect', function () {
  console.log(`disconnected from server ${new Date()}`)
});


// jQuery('#message-form').on('submit', function (e) {
//   e.preventDefault();
  var messageForm = jQuery('#message-form')
  messageForm.on('submit',function (e) {
    e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: jQuery('[name=from]').val(),
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('browser is not compatible')
  }
  locationButton.attr('disabled','disabled').text('Sending location..');     // location button will be disabled till value returns
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    console.log(position.coords.latitude, position.coords.longitude)
    //return console.log(position);

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch the location')
  });
});

const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

var app = express();


var publicpath = path.join(__dirname, '../public');
console.log(publicpath);

var port = process.env.PORT || 3000;

app.use(express.static(publicpath));

var server = http.createServer(app);
server.listen(port,() => {
  console.log(`Server is listening on ${port}`)
});

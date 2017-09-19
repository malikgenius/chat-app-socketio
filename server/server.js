const express = require('express');
const path = require('path');

var app = express();

var publicpath = path.join(__dirname, '../public');
console.log(publicpath);

var port = process.env.PORT || 3000;

app.use(express.static(publicpath));


app.listen(port,() => {
  console.log(`Server is listening on ${port}`)
});

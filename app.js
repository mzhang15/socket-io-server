// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 8080;
// const path = require('path');
// const bodyParser = require('body-parser');
// var session = require('express-session');
// var logger = require('morgan');
// var xss = require('xss');
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

// app.set('view engine', 'ejs');
// app.use(session({secret: "banana milk"}));

// app.use(express.static(__dirname + '/public'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// var routes = require('./routes');
// app.use('/', routes);

function onConnection(socket){
  // add to room
  socket.on('joinRoom', (data) => socket.join(data.room));
  // notify users when new members join/leave room
  socket.on('joinRoom', (data) => io.sockets.in(data.room).emit('roomEvent', data));
  // play/pause/seek change alert others in room
  socket.on('videoSet', (data) => io.sockets.in(data.room).emit('videoSet', data));
}

io.on('connection', onConnection);

server.listen(port, () => console.log('listening on port ' + port));

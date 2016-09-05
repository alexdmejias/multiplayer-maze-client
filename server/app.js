var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8001);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

const connections = [];

io.on('connection', function (socket) {
  console.log('socket connected');
  
  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket.id), 1);
    console.log('someone disconnected, we now have ', connections.length, ' connections');

  });

  connections.push(socket.id);
  console.log('new connection stated, we now have ', connections.length, ' connections');
  socket.emit('game_disconnection', JSON.stringify(connections));
});
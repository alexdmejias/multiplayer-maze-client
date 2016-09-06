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
    io.emit('game_delete-connection', socket.id);
  });

  console.log('new connection stated, we now have ', connections.length, ' connections');
  io.emit('game_new-connection', socket.id);
  connections.push(socket.id);
  io.to(socket.id).emit('game_current-connections', JSON.stringify(connections));

});
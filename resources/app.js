const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const connectDB = require('./configs/database');
const router = require('./routers');

app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

io.on('connection', function (client) {
  console.log('user connected');
  var room; //phong chat
  //join chat
  client.on('join', function (data) {
    room = data;
    client.join(room);
  });
  client.on('message', function (data) {
    io.to(room).emit('thread', data);
  });
});

connectDB();
router(app);

app.get('/chat', (req, res) => {
  return res.render('chat.ejs');
});

server.listen(5002, () => {
  console.log('server is running at port 5002');
});

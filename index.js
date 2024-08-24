const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('startBroadcast', () => {
        console.log('Broadcast started');
        socket.broadcast.emit('startBroadcast');
      socket.emit('broadcastStatus', 'started'); // or 'failed'

    });

    socket.on('stopBroadcast', () => {
        console.log('Broadcast stopped');
        socket.broadcast.emit('stopBroadcast');
    });

    socket.on('audioData', (data) => {
        socket.broadcast.emit('audioData', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

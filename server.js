const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Standard check to see if the server is up
app.get('/', (req, res) => {
    res.send('Game server is running perfectly!');
});

io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // When a player sends a move, broadcast it to everyone else
    socket.on('sendMove', (data) => {
        socket.broadcast.emit('receiveMove', data);
    });

    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
    });
});

// Render gives your server a dynamic port automatically, or defaults to 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server live on port ${PORT}`));

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// --- THIS LINE TELLS EXPRESS TO SERVE YOUR INDEX.HTML ---
app.use(express.static(__dirname)); 

let gameState = { board: Array(9).fill(null), currentPlayer: 'X' };

io.on('connection', (socket) => {
    console.log('Player connected');
    socket.emit('gameState', gameState);

    socket.on('makeMove', (index) => {
        if (gameState.board[index] === null) {
            gameState.board[index] = gameState.currentPlayer;
            gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
            io.emit('gameState', gameState);
        }
    });

    socket.on('reset', () => {
        gameState = { board: Array(9).fill(null), currentPlayer: 'X' };
        io.emit('gameState', gameState);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
    res.send('Server is running'); // Отправляем текстовый ответ клиенту
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data); // Пример отправки сообщения обратно клиенту
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

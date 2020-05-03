const express = require('express');
const path = require('path');
const server = require('http').createServer();
const io = require('socket.io')(server);
const clientManagerHandlers = require('./clienManager');
const clientManager = clientManagerHandlers();
const {isUserNameUnavailable, registerUser, removeUser} = clientManager;

const app = express();
const port = 9001;
app.use(express.static(path.resolve('./build')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve('./build/index.html'), error => {
        if (error) {
            console.warn(error);
            res.status(404);
            res.send('not found');
        }
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

let messages = [];
let serverNames = new Map();

io.on('connection', (socket) => {
    socket.on('SEND_USER', (name, callback) => {
        if (isUserNameUnavailable(name)) {
            callback('Пользователь с таким именем уже существует!')
        }
        const users = registerUser(name);
        serverNames.set(socket.id, name);

        socket.broadcast.emit('GET_USERS', users);
        socket.emit('GET_USERS', users, null, callback);
        socket.emit('SEND_MESSAGES', messages);
        socket.broadcast.emit('SEND_MESSAGES', messages);
    });

    socket.on('SEND_MSG', props => {
        messages = [...messages, props];
        socket.emit('SEND_MESSAGES', messages);
        socket.broadcast.emit('SEND_MESSAGES', messages)
    });

    socket.on('LOGOUT', (name) => {
        const users = removeUser(name);
        serverNames.delete(socket.id);
        socket.broadcast.emit('GET_USERS', users);
        socket.emit('GET_USERS', users);
    });

    socket.on('disconnect', () => {
        if(!serverNames.has(socket.id)) return;
        const users = removeUser(serverNames.get(socket.id));
        socket.broadcast.emit('GET_USERS', users);
        socket.emit('GET_USERS', users);
    });
});

server.listen(9000, function (err) {
    if (err) throw err;
    console.log('listening on port 9000')
});
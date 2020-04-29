const express = require('express');
const path = require('path');
const server = require('http').createServer();
const io = require('socket.io')(server);

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

let users = [];
let messages = [];
let serverNames = [];

io.on('connection', (socket) => {
    socket.on('SEND_USER', (name, callback) => {
        users = [...users, name];
        serverNames = [...serverNames, {socketId: socket.id, name}];
        socket.broadcast.emit('GET_USERS', users);
        socket.emit('GET_USERS', users, callback);
        socket.emit('SEND_MESSAGES', messages);
        socket.broadcast.emit('SEND_MESSAGES', messages)
    });

    socket.on('SEND_MSG', props => {
        messages = [...messages, props];
        socket.emit('SEND_MESSAGES', messages);
        socket.broadcast.emit('SEND_MESSAGES', messages)
    });

    socket.on('LOGOUT', (name) => {
        users = users.filter((usr) => usr !== name);
        serverNames = serverNames.filter((item) => item.name !== name);
        socket.broadcast.emit('GET_USERS', users);
        socket.emit('GET_USERS', users);
    });

    socket.on('disconnect', () => {
        serverNames = serverNames.filter(data => data.socketId !== socket.id);
        users = serverNames.map(data => data.name);
        socket.broadcast.emit('GET_USERS', users);
        socket.emit('GET_USERS', users);
    });
});

server.listen(9000, function (err) {
    if (err) throw err;
    console.log('listening on port 9000')
});
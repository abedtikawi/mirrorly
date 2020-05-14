const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/route');
const io = require('socket.io')(1233);
const users = {}
const port = 5501;
const session = require('express-session');
const readLastLine = require('read-last-line');
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
let data = 'Server Connected';
io.on('connection', socket => {

    io.emit('chat-message', data);
    console.log('Connected to Socket ');

    socket.on('new-user', name => {
        users[socket.id] = name;
        console.log(name);
        console.log(users);
        socket.broadcast.emit('user-connected', name);
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id]
        });
        console.log(message);

    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        console.log(users[socket.id] + ' disconnected from port')
        delete users[socket.id];
    })

});
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use('/api', indexRouter);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.set("io", io);
module.exports.socket = () => io
app.listen(port, () => {});
console.log(`Example app listening on port ${port}!`)
// app.get('/', (req, res) => {
//     res.json('Welcome to Mirrorly');
//     res.end();
// });
//  setInterval(() => {
//     readLastLine.read('./toPython3.txt', 1).then((data) => {
//         console.log(data);
//         io.on('connection', socket => {
//             io.emit('chat-message', data);
//                 console.log('Connected to Socket ');
//             })
//     }).catch((error) => {
//         console.log(error.message)
//     })
// }, 1500);
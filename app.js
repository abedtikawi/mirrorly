const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/route');
const port = 5501;
const io = require('socket.io')(1233);
const users = {}
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json('Welcome to Mirrorly');
    res.end();
});
const data='Server Connected ';
io.on('connection', socket => {
    
    io.emit('chat-message',data);
    console.log('Connected to Socket ');
    // socket.on('chat-message', data=>{
    //     data='whatever';
    //       io.emit('chat-message',data);
    // });
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
       console.log(users[socket.id]+' disconnected from port')
        delete users[socket.id];

      
    })

});
app.use('/api', indexRouter);
app.listen(port, () => {});
console.log(`Example app listening on port ${port}!`)
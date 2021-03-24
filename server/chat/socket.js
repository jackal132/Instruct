const { addUser, removeUser, getUser, getUsersInRoom} = require('./user');

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {

        socket.on('join', ({ username, roomId}, callback) => {
            const { err, user } = addUser({id: socket.id, username, roomId });
            
            if(err) return callback(err);

            socket.join(user.roomId);

            socket.emit('message', { user: 'admin', text : `${user.username}, welcome to room ${user.roomId}.`});
            socket.broadcast.to(user.roomId).emit('message', { user : 'admin', text: `${user.username} has joined`});

            io.to(user.roomId).emit('roomData', { roomId: user.roomId, users: getUsersInRoom(user.roomId) });

            callback();
        });

        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id);

            io.to(user.roomId).emit('message', { user: user.username, text : message });

            callback();
        });

        socket.on('disconnect', () => {
            const user = removeUser(socket.id);

            if(user) {
                io.to(user.roomId).emit('message', { user : 'admin', text : `${user.username} has left.`});
                io.to(user.roomId).emit('roomData', { roomId : user.roomId, users: getUsersInRoom(user.roomId) });
            }
        });
    });
}
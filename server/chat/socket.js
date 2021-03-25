const { addUser, removeUser, getUser, getUserByUserId, getUsersInRoom} = require('./user');
const Room = require('../models/room');

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {

        socket.on('join', async ({ _id, username, roomId}, callback) => {
            const { err, user } = addUser({userId : _id, id: socket.id, username, roomId });
            
            if(err) return callback(err);

            socket.join(user.roomId);

            let roomTitle = '';
            let count = 0;

            await Room.findById(user.roomId, (err, doc) => {

                if(err) throw err;
                // 아이디가 없는경우
                if(doc) {

                    count = doc.participantCnt;
                    // 생성자 인경우
                    if(_id === doc.createId){
                        // 참여자수가 1이 아닌경우 증가
                        if(doc.participantCnt !== 1){
                            count = count + 1;
                        }
                    } else {
                        count = count + 1;
                    }

                    roomTitle = doc.title;
                }
            });

            await Room.findByIdAndUpdate(user.roomId, { $set : { participantCnt : count }});

            socket.emit('message', { user: 'admin', text : `${user.username}, welcome to room ${roomTitle}.`});
            socket.broadcast.to(user.roomId).emit('message', { user : 'admin', text: `${user.username} has joined`});

            io.to(user.roomId).emit('roomData', { roomId: user.roomId, users: getUsersInRoom(user.roomId) });

            callback();
        });

        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id);

            io.to(user.roomId).emit('message', { user: user.username, text : message });

            callback();
        });

        socket.on('disconnect', async () => {
            const user = removeUser(socket.id);

            if(user) {

                let count = 0;
                await Room.findById(user.roomId, (err, doc) => {
                    if(err) throw err;
                    // 아이디가 없는경우
                    if(doc) {
                        count = doc.participantCnt - 1;
                        roomTitle = doc.title;
                    }
                });

                await Room.findByIdAndUpdate(user.roomId, { $set : { participantCnt : count }});

                io.to(user.roomId).emit('message', { user : 'admin', text : `${user.username} has left.`});
                io.to(user.roomId).emit('roomData', { roomId : user.roomId, users: getUsersInRoom(user.roomId) });
            }
        });
    });
}
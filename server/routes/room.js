const express = require('express');
const router = express.Router();
let Room = require('../models/room');

// 방 목록 조회
router.get('/', (req, res) =>{ 

    Room.find().sort({title:1}).exec().then(result => {
        res.status(200).send(result);
    });
});

// 방 상세정보 조회
router.get('/:roomid', (req, res) =>{ 
    // const io = req.app.get('io');
    const roomId = req.params.roomId;

    // io.of(roomId);
    // io.on('connection', (socket) => {
    //     console.log('User has connected to socket.io');
        
    //     socket.on('disconnect', () => {
    //        console.log('User has disconnected');
    //     });

    //     socket.on('leave', data => {
    //         socket.leave(roomId, ()=>{
    //             console.log(data.username + ' leave');
    //             io.to(roomId).emit('leave', data.username);
    //         });
    //     });

    //     socket.on('join', data => {
    //         socket.join(roomId, ()=>{
    //             console.log(data.username + ' join');
    //             io.to(roomId).emit('join', data.username);
    //         });
    //     });

    //     socket.on('chat', data => {
    //         io.to(roomId).emit('chat', data);
    //     });

    // });

    res.status(200).send('Success');

});

// 방 생성
router.post('/', (req, res) =>{ 
    
    Room.findOne({ createId : req.body.createId }, (err, doc) => {
        if(err) throw err;

        if(!doc) {
            let room = new Room({
                title : req.body.roomTitle,
                participantCnt : 1,
                createId : req.body.createId
            });

            room.save(e => {
                if(e) throw e;

                return res.status(200).send({ message : 'Room Create', roomId : room._id});
            });

        } else {    
            return res.status(200).send({message : 'Already exists', roomId : ''});
        }
        
    });
});

router.post('/:roomid', (req, res) => {
    // const io = req.app.get('io');
    // const roomId = req.params.roomId;
    return res.status(200).send('!!!!');
});

// 방 삭제
router.delete('/:roomid', (req, res) =>{ 

});

// 방정보 수정
router.put('/:roomid', (req, res) =>{ 

});

module.exports = router;
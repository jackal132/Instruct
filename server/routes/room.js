const express = require('express');
const router = express.Router();
let Room = require('../models/room');

// 방 목록 조회
router.get('/', (req, res) =>{ 

    // 참여자 0인 방 삭제
    Room.deleteMany({participantCnt : 0}, (err, result) => {
        if(err) throw err;
    });

    Room.find().sort({title:1}).exec().then(result => {
        res.status(200).send(result);
    });
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

module.exports = router;
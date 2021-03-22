const express = require('express');
const router = express.Router();
let Room = require('../models/room');

// 방 목록 조회
router.get('/', (req, res) =>{ 

    Room.find().sort({title:1}).exec().then(result => {
        res.send(result);
    });
});

// 방 상세정보 조회
router.get('/:roomid', (req, res) =>{ 

});

// 방 생성
router.post('/', (req, res) =>{ 

});

// 방 삭제
router.delete('/:roomid', (req, res) =>{ 

});

// 방정보 수정
router.put('/:roomid', (req, res) =>{ 

});

module.exports = router;
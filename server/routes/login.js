const express = require('express');
const router = express.Router();
let Member = require('../models/member');

router.post('/facebook', (req, res) => {
    Member.findOne({id : req.body.id}, (err, doc) => {
        if(err) throw err;
        // 아이디가 없는경우
        if(!doc) {
            let member = new Member({
                id : req.body.id,
                name : req.body.name
            });
            member.save(e => {
                if(e) throw e;

                let loginInfo = {
                    _id : req.body.id,
                    username : req.body.name
                }

                return res.status(200).send({ loginInfo : loginInfo});
            });
        
        // 아이디가 있는경우
        } else {
            let loginInfo = {
                _id : req.body.id,
                username : req.body.name
            }
            return res.status(200).send({ loginInfo : loginInfo });
        }
       
    });
});

router.post('/google', (req, res) => {

});

module.exports = router;
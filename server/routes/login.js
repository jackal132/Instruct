const express = require('express');
const router = express.Router();

router.post('/facebook', (req, res) => {
    // console.log('here', req.body);
    // req.body.name;
    // req.body.id;
    res.status(200).send({message:'hoi'});
});

router.post('/google', (req, res) => {

});

module.exports = router;
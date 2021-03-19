const express = require('express');
const path = require('path');
const app = express();
let router = express.Router();

require('dotenv').config({path: path.join(__dirname, '../.env')});
const SERVER_PORT = process.env['SERVER_PORT'];

router.get('/', (req,res) => {
    console.log('call this');
    res.send({message:'success'});
});

app.use('/api',router);

app.listen(SERVER_PORT, () => { console.log(`Listening on port ${SERVER_PORT}`) });
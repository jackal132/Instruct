const express = require('express');
const path = require('path');
const app = express();
require('./db/connet')();

require('dotenv').config({path: path.join(__dirname, '../.env')});
const SERVER_PORT = process.env['SERVER_PORT'];

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use('/login', require('./routes/login.js'));

app.listen(SERVER_PORT, () => { console.log(`Listening on port ${SERVER_PORT}`) });
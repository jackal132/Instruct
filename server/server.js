const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
require('./db/connet')();

require('dotenv').config({path: path.join(__dirname, '../.env')});
const SERVER_PORT = process.env['SERVER_PORT'];
const COOKIE_SECRET = process.env['COOKIE_SECRET'];

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET
}));

app.use('/login', require('./routes/login'));
app.use('/room', require('./routes/room'));

app.listen(SERVER_PORT, () => { console.log(`Listening on port ${SERVER_PORT}`) });
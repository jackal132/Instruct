const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({path: path.join(__dirname, '../../.env')});

module.exports = () => {
    function connect() {
        mongoose.connect(process.env['MONGODB_URI'],
        { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex : true },     
        err => {
            if(err){
                console.error('mongodb connection error', err);
            }

            console.log('mongodb connected');
        });
    }

    connect();

    // 연결이 해제(disconnect)될 시에 다시 connect 함수를 실행하는 부분
    mongoose.connection.on('disconnected', connect);
}
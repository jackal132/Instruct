const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    title : { type: String, required: true },      // 방제목
    participantCnt : { type: Number, default: 0 }, // 참여인원
    createId : { type: String, required: true },   // 생성자 id
    createDt : { type: Date, default : Date.now }  // 생성일자
});

RoomSchema.index({title:1});

module.exports = mongoose.model('Room', RoomSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    id : { type:String, required:true, unique: true}, // 아이디
    name : { type:String, required:true },            // 이름
    createAt : { type:Date, default:Date.now }        // 생성일
});

MemberSchema.index({id:1});

module.exports = mongoose.model('Member', MemberSchema);
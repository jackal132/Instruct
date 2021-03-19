const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    id : { type:String, required:true, unique: true},
    name : { type:String, required:true },
    createAt : { type:Date, default:Date.now }
});

module.exports = mongoose.model('Member', MemberSchema);
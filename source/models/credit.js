
const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose');

const credit = new mongoose.Schema({
    creditId: { type: Number, },
    dateExpired: { type: String, },
    ccvID: { type: String },
    note: { type: String},
    
},{timestamps : true});


credit.plugin(passportLocalMongoose);

module.exports = mongoose.model('Credit', Credit);



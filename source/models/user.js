
const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose');

const slug = require('mongoose-slug-generator');



const User = new mongoose.Schema({
    roles: { type: String, },
    username: { type: String, },
    password: { type: String },
    phone: { type: String, },
    email: { type: String, },
    fullname: { type: String },
    birthday: { type: String, },
    address: { type: String, },
    frontId: { type: String, },
    cmndfront: {data: Buffer, type: String, },
    cmndback: { data: Buffer, type: String, },
    countlogin: { type: String, },
    //1. waitConfirm 2. confirmed 3.waitUpdate 4. bannedMany
    countFailed: { type: Number, },
    permission: { type: String, default: "Not Verified", },
    banCheck: {type : Boolean, default: false},

    //count rut tien
    countWithdraw: {type: Number},
    //wallet
    money: { type:Number, default:0},
    //slug
    slug: {type : String, slug : 'username', unique: true},
    //history
    history : [{
        username: { type: String, },
        phone: { type: String, },
        type: { type: String},
        money: { type: Number},
        note: { type: String, },
        status: { type: String, },
        cardnumber: { type: String},
        // 1111124683 , 1111124683 ,1111124683,1111124683
        createdAt: {type: Date , default: Date.now()},
    },{timestamps : true}]


    
},{timestamps : true});


mongoose.plugin(slug);
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);



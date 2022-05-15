
const mongoose = require('mongoose')

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
    cmndfront: { type: String, },
    cmndback: { type: String, },
    countlogin: { type: String, },
    status: { type: String, },
    //1. waitConfirm 2. confirmed 3.waitUpdate 4. bannedMany
    countFailed: { type: Number, },
    permission: { type: String, default: "Not Verified", },
})
module.exports = mongoose.model('User', User);



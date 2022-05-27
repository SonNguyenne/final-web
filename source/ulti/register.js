const User = require('../models/user')
const multer = require('multer')
const fs = require('fs')


function checkUserExist(username) {
    User.findOne({ username: username }).then(data => {
        return true
    }).catch(err => {
        console.log(err)
    })
    return false
}


function makePassword() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }
    return result
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = "./source/public/uploads/";
        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir);
        // }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);

    },
});

var upload = multer({ storage: storage }).fields([{ name: 'cmndfront', maxCount: 1 }, { name: 'cmndback', maxCount: 8 }])




module.exports = { makePassword, checkUserExist, upload }


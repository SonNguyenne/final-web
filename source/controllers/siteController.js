const User = require('../models/user')
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')
const { checkUserExist, makePassword, upload } = require('../ulti/register')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');




//tao tai khoan admin
// bcrypt.hash('123456', 2, function (err, hash) {
//     const user = new User({
//         roles: 'admin',
//         username: 'admin',
//         password: hash,

//     })
//     console.log("1")
//     user.save(() => {

//     });
// });


class SiteController {

    // [GET] /
    index(req, res, next) {
        res.render('index', {
            title: 'Login',
            layout: 'nopartials'
        })
    };

    // [GET] /register
    register(req, res, next) {
        res.render('register', {
            layout: 'nopartials'
        })
    }


    // [POST] /register/registerSuccess
    registerSuccess(req, res) {


        // random username
        upload(req, res, function (err) {
            const phone = req.body.phone
            const email = req.body.email
            User.findOne({
                $or: [
                    { email: req.body.email },
                    { phone: req.body.phone }
                ]
            }).then(data => {
                console.log(data);
                if(data!=null) {
                    return res.render('register', {
                        success: false,
                        msg: `Sdt da ton tai`
                    })
                }else{
                    let username = Math.random() * (9999999999 - 1000000000) + 1000000000;
                    while (checkUserExist(username)) {
                        username = Math.random() * (9999999999 - 1000000000) + 1000000000;
                    }
                    username = parseInt(username)
                    //Tạo password ngẫu nhiên
                    let temp = makePassword()
                    bcrypt.hash(temp, 10, function (err, hash) {
                        const user = new User({
                            roles: 'user',
                            username: username,
                            password: hash,
                            phone: req.body.phone,
                            email: req.body.email,
                            fullname: req.body.fullname,
                            address: req.body.address,
                            birthday: req.body.birthday,
                            cmndfront: req.files.cmndfront['0'].path,
                            cmndback: req.files.cmndback['0'].path,
                            countlogin: 0,
                            countFailed: 0,
                            status: 'waitConfirm'
                        })
                        user.save((error, userResult) => {
                            if (error) {
                                console.log(error)
                                return res.json({ msg: 'Đăng ký thất bai', success: false })
                            }
        
                            //send username and password to user
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: "ts29032001@gmail.com",
                                    pass: "123456son"
                                }
                            });
        
                            var mailOptions = {
                                from: process.env.GMAIL,
                                to: req.body.email,
                                subject: 'Final-web - This is your account',
                                text: `information about this:
                                    username: ${username}
                                    password: ${temp}
                                `
                            };
        
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
        
                                }
                            });
                            return res.render('login')
                        });
        
                    });
                }
            }).catch(err => {
                console.log(err)
            })
           
        });

    }

    // [GET] /login
    login(req, res) {
        res.render('login', {
            title: 'Login',
            layout: 'nopartials'
        })
    };


    // [POST] /login/ validation
    validation(req, res) {
        let username = req.body.username
        let password = req.body.password

        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return console.log(err)
            }
            if (!user) {
                return res.render('login', {
                    success: false,
                    msg: `Sai tài khoản hoặc mật khẩu`
                })
            }
            //kiểm tra nếu count = 10 thì là đang khoá tạm thời
            if (user.countFailed == 10) {
                return res.render('login', {
                    success: false,
                    msg: `Tài khoản hiện đang bị tạm khóa, vui lòng thử lại sau 1 phút`
                })
            }
            //kiểm tra nếu count = 10 thì là đang khoá tạm thời
            if (user.countFailed == 6) {
                return res.render('login', {
                    success: false,
                    msg: `Tài khoản đã bị khoá vĩnh viễn! Bạn đã nhập sai mật khẩu quá nhiều lần! Liên hệ admin để mở lại tài khoản`
                })
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ _id: user._id }, 'secretpasstoken', { expiresIn: '30m' })
                    User.updateOne({ username: username }, { $set: { countFailed: 0 } }, (err, status) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    //Tạo ra 2 cái render theo role(Customer, Admin)
                    // Của Customer thì đẩy về Index tổng `localhost:3000/`
                    // Của Admin thì đẩy về Index Admin `localhost:3000/Admin`
                    //Dùng Promise All để đẩy database của người dùng theo ID của token lên 
                    //==> Tìm đc tên người dùng để hiển thị ở navbar với footer (của admin)
                    return res.render('changePassword')
                }
                const failed = user.countFailed
                if (failed == 2) {
                    //Khoá tạm thời set count = 10
                    User.updateOne({ username: username }, { $set: { countFailed: 10 } }, (err, status) => {
                        if (err) {
                            console.log(err)
                        }
                    })

                    //Mở khoá tài khoản sau 1 phút, trả count về 3
                    var lockAccountOneMinute = setTimeout(function () {
                        User.updateOne({ username: username }, { $set: { countFailed: 3 } }, (err, status) => {
                            if (err) {
                                console.log(err)
                            }
                        })
                        console.log(`unlock ${username} !`)
                    }, 60000);
                    return res.render('login', {
                        success: false,
                        msg: `Tài khoản đã bị khoá trong 1 phút! Nếu bạn tiếp tục nhập sai thêm 3 lần nữa sẽ bị khoá vĩnh viễn!`
                    })
                } else if (failed >= 5) {
                    User.updateOne({ username: username }, { $set: { countFailed: 6 } }, (err, status) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    return res.render('login', {
                        success: false,
                        msg: 'Tài khoản đã bị khoá vĩnh viễn! Bạn đã nhập sai mật khẩu quá nhiều lần! Liên hệ admin để mở lại tài khoản'
                    })
                } else {
                    User.updateOne({ username: username }, { $set: { countFailed: failed + 1 } }, (err, status) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    return res.render('login', {
                        success: false,
                        msg: `Bạn đã nhập sai mật khẩu ${failed + 1} lần!!!`
                    })
                }
            });
        })


    }

    changePassword(req, res) {
        res.render('changePassword')
    }

    changePasswordSuccess(req, res) {
        
        const newPassword = req.body.newPassword
        const confirmPassword = req.body.confirmPassword
        if (newPassword != confirmPassword && (newPassword != null && confirmPassword != null)) {
            alert("khong trung`")
        } else {
        bcrypt.hash(newPassword, 10, function (error, hash) {
            if (error) {
                return res.json({ username: username, success: false, msg: 'Đổi mật khẩu thất bại' })
            }
            User.updateOne({ username: username }, { $set: { password: hash, countlogin: 1 } }, (err, status) => {
                if (err) {
                    console.log(err)
                    return res.json({ username: username, success: false, msg: 'Đổi mật khẩu thất bại' })
                }
                return res.json({ username: username, success: true, msg: 'Đổi mật khẩu thành công' })
            })
        });
    }}

}

module.exports = new SiteController;

const res = require('express/lib/response');
const siteController = require('./SiteController');

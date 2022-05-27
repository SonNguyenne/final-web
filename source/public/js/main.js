
//=====================Login================

function login() {
    $.ajax({
        url: '/login',
        type: 'post',
        data: {
            username: $('#username').val(),
            password: $('#password').val(),
        },
        msg: ''
    }
    ).then(data => {
        if (data.success) {
            // console.log(data)
            setCookie('token', data.token, 1);
            window.location.href = "/"
        } else {
            alert(data)
            window.location.href = "/login"
        }

    }).catch(err => {
        console.log(err)
    })
}

//Get Set cookies
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function logout() {
    $.ajax({
        url: '/logout',
        type: 'post',
    }
    ).then(data => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert(data)
        window.location.href = "/login"
    }).catch(err => {
        console.log(err)
    })
}

//=====================Login End================

//=====================Change Password =================
function changePassword(username) {
    console.log(username)

    const newPassword = $('#newPassword').val();
    const confirmPassword = $('#confirmPassword').val();
    if (newPassword != confirmPassword && (newPassword != null && confirmPassword != null)) {
        alert("Your passwords not match!!! Please enter again!")
    } else {
        $.ajax({
            url: '/changePassword',
            type: 'post',
            data: {
                username: username,
                newPassword: newPassword
            }
        }
        ).then(data => {
            if (data.success) {
                window.location.href = "/login"
            } else {
                alert(data.msg)
            }

        }).catch(err => {
            console.log(err)
        })
    }
}

//=====================Change Password End=================

//=====================Change Password afterLogin 2 =================
function changePassword2(username) {

    console.log(username)
    const oldPassword = $('#oldPassword').val();
    const newPassword = $('#newPassword').val();
    const confirmPassword = $('#confirmPassword').val();
    if (newPassword != confirmPassword && (newPassword != null && confirmPassword != null)) {
        alert("Your passwords not match!!! Please enter again!")
    } else {
        $.ajax({
            url: '/resetPassword',
            type: 'post',
            data: {
                username: username,

                newPassword: newPassword,
                oldPassword: oldPassword
            }
        }
        ).then(data => {
            if (data.success) {
                alert(data)
                window.location.href = "/"
            } else {
                alert(data)
            }

        }).catch(err => {
            console.log(err)
        })
    }
}

//=====================Change Password 2 End=================


//==============================Forgot Password =============================

// function forgotPassword() {

//     const username = $('#username').val();
//     const email = $('#email').val();
//         $.ajax({
//             url: '/changePassword',
//             type: 'post',
//             data: { 
//                 username: username,
//                 email: email
//             }
//         }
//         ).then(data => {
//             if (data.success) {
//                 alert(data)
//                 window.location.href = "/login"
//             } else {
//                 alert(data)
//             }

//         }).catch(err => {
//             console.log(err)
//         })

// }


//============================== Charge Money /banking =============================
function creditIdCheck() {
    const creditId = document.getElementById("creditId").value;
    const expiredDate = document.getElementById("expiredDate").value;
    const cvvId = document.getElementById("cvvId").value;
    const money = document.getElementById("money").value;
    console.log(creditId)
    console.log(expiredDate)
    console.log(cvvId)
    console.log(money)
    if ((creditId == 111111) && (expiredDate == '10/10/2022') && (cvvId == 411)) {
        var chargeForm = document.forms['charge-form']
        alert('Nạp tiền thành công')
        // setTimeout(3000)
        chargeForm.action = '/customer/charge-success'
        chargeForm.onsubmit();

        // alert('Nap tien thanh cong')
    }
    else if ((creditId == 222222) && (expiredDate == '11/11/2022') && (cvvId == 443)) {
        if (money >= 1000000) {
            alert('Mỗi lần chỉ được nạp 1 triệu')
        } else {
            var chargeForm = document.forms['charge-form']
            alert('Nạp tiền thành công')
            chargeForm.action = '/customer/charge-success'
            chargeForm.onsubmit();
        }

    } else if ((creditId == 333333) && (expiredDate == '12/12/2022') && (cvvId == 577)) {
        alert('Thẻ hết hạn sử dụng, vui lòng dùng thẻ khác')

    } else if ((creditId != 111111) || (creditId != '10/10/2022') || (creditId != 411) ||
        (creditId != 222222) || (expiredDate != '11/11/2022') || (cvvId != 443)
            (creditId != 333333) || (expiredDate != '12/12/2022') || (cvvId != 577)
    ) {
        alert('Sai thông tin thẻ')
    }
    else {
        alert('Thẻ này không được hỗ trợ')

    }


}

//============================== Withdraw Money =============================
function withdrawIdCheck(){
    const wCreditId = document.getElementById("withdrawCreditId").value;
    const wExpiredDate = document.getElementById("withdrawExpiredDate").value;
    const wCvvId = document.getElementById("withdrawCvvId").value;
    const wMoney = document.getElementById("money").value;
    const wNote = document.getElementById("note").value;

    if ((wCreditId == 111111) && (wExpiredDate == '10/10/2022') && (wCvvId == 411)) {
        if(wMoney % 50000 == 0){
        var withdrawForm = document.forms['withdraw-form']
        alert('Rút tiền thành công')
        withdrawForm.action = '/customer/withdraw-success'
        withdrawForm.onsubmit();
        }else
        alert('Số tiền mỗi lần rút phải là bội số của 50.000')
        
    }else{
        alert('Sai thông tin thẻ')
        
    }
}



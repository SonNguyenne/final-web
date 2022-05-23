
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
                alert(data)
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
    // if(creditId == 111111 ) alert('Chi chuyen dc 1tr')
    // 111111 && 10/10 && 411
    // 222222 11/11  443
    // 333333 12/12 577
    // ((creditId == 222222) && (expiredDate == '11/11/2022') && (cvvId == 443))
    // ((creditId == 333333) && (expiredDate == '12/12/2022') && (cvvId == 577)) 

    if ((creditId == 111111) && (expiredDate == '10/10/2022') && (cvvId == 411)) {
        var chargeForm = document.forms['charge-form']
        alert('Nap tien thanh cong')
        // setTimeout(3000)
        chargeForm.action = '/customer/charge-success'
        chargeForm.onsubmit();

        // alert('Nap tien thanh cong')
    }
    else if ((creditId == 222222) && (expiredDate == '11/11/2022') && (cvvId == 443)) {
        if (money >= 1000000) {
            alert('1 trieu 1 lan')
        } else {
            var chargeForm = document.forms['charge-form']
            alert('Nap tien thanh cong')
            chargeForm.action = '/customer/charge-success'
            chargeForm.onsubmit();
        }

    } else if ((creditId == 333333) && (expiredDate == '12/12/2022') && (cvvId == 577)) {
        alert('het han')

    } else if ((creditId != 111111) || (creditId != '10/10/2022') || (creditId != 411) ||
        (creditId != 222222) || (expiredDate != '11/11/2022') || (cvvId != 443)
            (creditId != 333333) || (expiredDate != '12/12/2022') || (cvvId != 577)
    ) {
        alert('sai thong tin the')
    }
    else {
        alert('the nay khong dc ho tro')

    }


}




//Index: Amination for register, login sidenav 
$(document).ready(function(){
    $('.login-section').hide();
    $('#move-to-login-section').click(function(){
        $('.register-sidenav').animate({
            left: '0',
        });
        $('.register-section').animate({
            opacity: 0,
            height: 'hide'
        })
        $('.login-sidenav').animate({
            right: '0',
        });
        $('.login-section').animate({
            height: 'show',
            opacity: 1,
        });
    })

    $('#move-to-register-section').click(function(){
        $('.login-sidenav').animate({
            left: '0',
        });
        $('.login-section').animate({
            opacity: 0,
            height: 'hide'
        })
        $('.register-sidenav').animate({
            left: '60%',
        });
        $('.register-section').animate({
            height: 'show',
            opacity: 1,
        });
    })
})

//End amination


//====================== Database simples =============================
window.addEventListener('DOMContentLoaded', event => {

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
});

//===================== Toggle the side navigation =============================
window.addEventListener('DOMContentLoaded', event => {

    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


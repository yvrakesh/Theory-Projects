// async function login(btn){
//     var selected;

//     type = document.getElementsByName('type');
//     for(i = 0; i < type.length; i++)
//         if(type[i].selected) {
//             selected = type[i].value;
//             break;
//         }

//     var data = {
//         username : btn.parentNode.querySelector('[name = UserName]').value,
//         password : btn.parentNode.querySelector('[name = Password]').value,
//         relation : selected
//     };

//     console.log(data);

//     response = await fetch('/api/login', {
//         method : "POST",
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body : JSON.stringify(data)
//     })

//     if(response.status == 200)
//         window.location = 'home/' + data.username + '?type=' + data.relation;
//     else if(response.status == 401) 
//         console.log("User Not Found");
// }

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
togglePassword.addEventListener('click', function (e) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});


$('#uname').on('keyup', function() {
    var input = $(this);
    if(input.val().length === 0) {
        input.addClass('empty');
    } else {
        input.removeClass('empty');
    }
});


$('#password').on('keyup', function() {
    var input = $(this);
    if(input.val().length === 0) {
        input.addClass('empty');
    } else {
        input.removeClass('empty');
    }
});

// function pass(){
//     console.log("alsdkjdsl");
//     var pwd = document.getElementById("password");
//     if(pwd.type=="password")
//         pwd.type = "text";
//     else
//         pwd.type = "password";
// }

// $(".toggle-password").click(function() {

//     $(this).toggleClass("fa-eye fa-eye-slash");
//     var input = $($(this).attr("toggle"));
//     if (input.attr("type") == "password") {
//       input.attr("type", "text");
//     } else {
//       input.attr("type", "password");
//     }
//   });
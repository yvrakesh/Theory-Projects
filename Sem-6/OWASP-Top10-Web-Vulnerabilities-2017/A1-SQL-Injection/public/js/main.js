
(function ($) {
    "use strict";


     /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    
    togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });

})(jQuery);



function Category(that){
    if(that.value=="student"){
        document.getElementById("opt1").style.display="block";
    }
    else{
        document.getElementById("opt1").style.display="none";
    }
    if(that.value=='faculty'||that.value=='admin'||that.value=='farm_head'||that.value=='social_head'||that.value=='nss_volunteer'||that.value=='special_project_volunteer'){
        document.getElementById("opt").style.display="block";
    }
    else{
        document.getElementById("opt").style.display="none";
    }
  }
  
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
  function openNav() {
      document.getElementById("active").style.display = "none";
      document.getElementById("activea").style.display = "none";
      document.getElementById("activeaa").style.display = "none";
      document.getElementById("activeaaa").style.display = "none";
      document.getElementById("activeaaaa").style.display = "none";
      document.getElementById("myNav").style.display = "block";
  }
  
  function closeNav() {
    document.getElementById("active").style.display = "block";
    document.getElementById("activea").style.display = "block";
    document.getElementById("activeaa").style.display = "block";
    document.getElementById("activeaaa").style.display = "block";
    document.getElementById("activeaaaa").style.display = "block";
    document.getElementById("myNav").style.display = "none";
  }
  
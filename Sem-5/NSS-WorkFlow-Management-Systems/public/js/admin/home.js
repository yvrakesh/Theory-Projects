// function Category(that){
//     if(that.value=="Student"){
//         document.getElementById("opt1").style.display="block";
//     }
//     else{
//         document.getElementById("opt1").style.display="none";
//     }
//     if(that.value=='Faculty'||that.value=='Admin'||that.value=='Farmhead'||that.value=='Socialhead'||that.value=='Nssvolunteer'||that.value=='Splvolunteer'){
//         document.getElementById("opt").style.display="block";
//     }
//     else{
//         document.getElementById("opt").style.display="none";
//     }
// }

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
document.getElementById("myNav").style.display = "block";
}

function closeNav() {
document.getElementById("active").style.display = "block";
document.getElementById("activea").style.display = "block";
document.getElementById("activeaa").style.display = "block";
document.getElementById("myNav").style.display = "none";
}
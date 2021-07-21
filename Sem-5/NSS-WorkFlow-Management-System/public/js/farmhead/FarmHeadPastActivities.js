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
  
  
  function openGroupDetails(){
    // document.getElementById("active").style.display = "none";
    // document.getElementById("activea").style.display = "none";
    // document.getElementById("activeaa").style.display = "none";
    // document.getElementById("activeaaa").style.display = "none";
    // document.getElementById("activeaaaa").style.display = "none";
    document.getElementById('grpdts').style.display='block';
  }
  
  function membersDetails(){
    // document.getElementById("active").style.display = "none";
    // document.getElementById("activea").style.display = "none";
    // document.getElementById("activeaa").style.display = "none";
    // document.getElementById("activeaaa").style.display = "none";
    // document.getElementById("activeaaaa").style.display = "none";
    document.getElementById('memdts').style.display='block';
  }
  
  function closeNavgrp() {
    document.getElementById('grpdts').style.display='none';
    // document.getElementById("active").style.display = "block";
    // document.getElementById("activea").style.display = "block";
    // document.getElementById("activeaa").style.display = "block";
    // document.getElementById("activeaaa").style.display = "block";
    // document.getElementById("activeaaaa").style.display = "block";
  }
  
  function closeNavmem() {   
    document.getElementById('memdts').style.display='none';
    // document.getElementById("active").style.display = "block";
    // document.getElementById("activea").style.display = "block";
    // document.getElementById("activeaa").style.display = "block";
    // document.getElementById("activeaaa").style.display = "block";
    // document.getElementById("activeaaaa").style.display = "block";
  }
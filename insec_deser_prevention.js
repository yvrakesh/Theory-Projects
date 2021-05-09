// Insecure Deserialization Prevention

var express = require('express');
var cookieParser = require('cookie-parser');
var escape = require('escape-html');
var serialize = require('node-serialize');
var app = express();
app.use(cookieParser())

function check_string(s){
  var n = s.length;
  var i = 0;
  var flag = 1;
  while (i < n){
    if(s[i] == ' ' || (s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z'))
      i += 1;
    else{
      flag = 0;
      break;
    }
  }
  return flag;
}
app.get('/', function(req, res) {
  if (req.cookies.profile){
    var str = new Buffer(req.cookies.profile, 'base64').toString();
    var str1 = JSON. parse(str);
    console.log('Your username is ',str1.username)
    console.log('Your City is ',str1.city)
    console.log('Your Country is ',str1.country)
    if(check_string(str1.username) && check_string(str1.country) && check_string(str1.city)){
      var obj = serialize.unserialize(str);
      if (obj.username) {
        res.send("Hello " + escape(obj.username) + "<br>" + "Your City is "+escape(obj.city) + "<br>" + "Your country is " + escape(obj.country));
      }
    }
    else{
      res.send("Sorry. You are not allowed to access due to Invalid username or location or country format. Please try again with a valid details<br>If you are not sure of this, beware someone are eavesdropping your network")
    }
  } 
  else {
      res.cookie('profile', "eyJ1c2VybmFtZSI6IkFkaXR5YSIsImNvdW50cnkiOiJpbmRpYSIsImNpdHkiOiJEZWxoaSJ9", {
        maxAge: 900000,
        httpOnly: true
      });
      res.send("Hello World")
  }
});
app.listen(3000);
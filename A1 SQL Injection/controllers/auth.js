
function check_string(s){
    var n = s.length;
    var i = 0;
    var flag = 1;
    while (i < n){
      if(s[i] == '\'' || s[i] == '"'){
          flag = 0;
          break;
      }
      i += 1
    }
    return flag;
}

const { type } = require('os');
const { connect } = require('../routes/admin');
const db = require('../util/database')
exports.getLogin = (req,res,next)=>{
    console.log('I am in get login')
    if(req.session.isLoggedIn == true){
        res.redirect('/home')
    }
    else{
        res.render('login')
    }
}

exports.getToLogin = (req,res,next)=>{
    res.redirect('/login');
}

exports.getSignup = (req,res,next)=>{
    console.log('I am in get signup')
    if(req.session.isLoggedIn == true){
        res.redirect('/home')
    }
    else{
        res.render('signup')
    }
}
exports.postLogin = async(req,res,next)=>{
    console.log("I am in post login")
    console.log('Username : '+req.body.userName)
    console.log('Password : '+req.body.password)
    // if(check_string(req.body.userName) && check_string(req.body.password)){
        var user
        try{
            console.log("SELECT * FROM users WHERE BINARY UserName = '"+req.body.userName+"' AND BINARY Password = '"+req.body.password+"';")
            user = await db.query("SELECT * FROM users WHERE BINARY UserName = '"+req.body.userName+"' AND BINARY Password = '"+req.body.password+"';")
            // var sql_query = "SELECT * FROM users WHERE BINARY UserName = "+db.escape(req.body.userName)+" AND BINARY Password = "+db.escape(req.body.password)+";"
            // console.log(sql_query)
            //user = await db.query(sql_query)
            //console.log("SELECT * FROM users WHERE BINARY UserName = ?", [req.body.userName],"AND BINARY Password = ?",[req.body.password],";")
            //user = await db.query("SELECT * FROM users WHERE BINARY UserName = ?", [req.body.userName],"AND BINARY Password = ?",[req.body.password],";")
        }
        catch(err){
            console.log('Hi')
            req.session.err = err
            await req.session.save()
            // return res.redirect('/error')
            return setTimeout(()=>{ return res.redirect('/error')},1500)
        } 
        console.log(user)

        if(user[0][0]){
            req.session.isLoggedIn = true
            req.session.user = user
            await req.session.save()
            setTimeout(()=>{ return res.redirect('/home')},700)
        }
        else{
            return res.render('login')
        }
    // }
    // else{
    //     return res.render('login_failed')
    // }
}
exports.postSignup = async(req,res,next)=>{
    console.log('signing up')
    try{
        if (check_string(req.body.userName) && check_string(req.body.password)){
            user = await db.query("SELECT * FROM users WHERE BINARY UserName = '"+req.body.userName+"';")
            console.log(user)
            if(user[0][0]){
                console.log('User already exists\n')
                return res.render('user_exists')
            }
            else {
                console.log('Adding user into database')
                var sql = "SELECT COUNT(*) AS total FROM injection.users;";
                console.log(sql)
                var query = await db.query(sql)
                console.log(query)
                console.log(typeof(query[0][0]))
                var query1 = query[0][0]
                console.log(query1)
                console.log(typeof(query1))
                var query3 = JSON.stringify(query1)
                console.log(query3)
                var i = query3.length,k=0;
                var s = ''
                while(k<i){
                    if(query3[k] >= '0' && query3[k] <= '9'){
                        s = s + query3[k]
                    }
                    k = k + 1
                }
                console.log(s)
                s = parseInt(s)+1
                console.log(s)
                var quer1 = 'INSERT INTO injection.users (id,UserName,Password) VALUES ROW('+s+',"'+req.body.userName+'","'+req.body.password+'");'
                console.log(quer1)

                var quer2 = await db.query(quer1)
                
                console.log('Added user into database')
                return res.render('sign_success')
            }
        }
        else{
            console.log('Invalid Username or Password Format')
            return res.render('sign_failed')
        }
    }
    catch(err){
        console.log('Hi')
        req.session.err = err
        await req.session.save()
        return setTimeout(()=>{ return res.redirect('/error')},1500)
    } 
}

exports.postLogout = (req,res,next)=>{
    console.log('Deleting Session!!!')
    req.session.destroy(err=>{
        console.log(err)
        console.log("LOGGED OUT!!!")
        res.redirect('/login')
    })
}

exports.getRedirect = (req,res,next)=>{
    var result,a,b,c,d 
    // while(1){
        try{
            result = req.session.err
            a = result.code
            b = result.errno
            c = result.sqlState
            d = result.sqlMessage
        }
        catch(err){
            
        }
    // }
    console.log(result)
    res.render('error',{p:a,q:b,r:c,s:d})
}
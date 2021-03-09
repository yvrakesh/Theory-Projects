
const db = require('../util/database')
exports.getLogin = (req,res,next)=>{
    if(req.session.isLoggedIn == true){
        res.redirect('/home')
    }
    else{
        res.render('login')
    }
}

exports.postLogin = async(req,res,next)=>{
    var user
    try{
        user = await db.query("SELECT * FROM users WHERE UserName = '"+req.body.userName+"' AND Password = '"+req.body.password+"';")
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
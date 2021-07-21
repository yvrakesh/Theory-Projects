
exports.goHome = (req,res,next)=>{
    console.log('Reaching home')
    if(!req.session.isLoggedIn){
        console.log('Hello')
        return res.redirect('/login')
    }
    const user = req.session.user;
    // const id = req.cookie.UserName;
    const x = user[0][0].id
    console.log(x)
    console.log('At home')
    res.render('home',{username:user[0]})
}

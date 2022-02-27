const User = require('../models/user');

exports.getLogin = (req,res,next)=>{
    res.render('login');
}

exports.postLogin = async (req,res,next)=>{
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await User.findOne({where:{UserName: userName, Password: password}});
    if(user==null){
        res.redirect('/login');
    }else{
        req.session.isLoggedIn=true;
        req.session.user=user;
        try {
            await req.session.save();
        } catch (error) {
            console.log(error);
        }
        
    }
    res.redirect('/xss');
}

exports.postLogout = (req, res, next) => {
    console.log("DELETING SESSION!!!!!");
    req.session.destroy(err => {
      console.log(err);
      console.log("LOGGED OUT!!!")
      res.redirect('/login');
    });
  };
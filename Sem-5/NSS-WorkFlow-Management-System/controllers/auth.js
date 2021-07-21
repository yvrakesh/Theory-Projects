const Admin = require("../models/admin");
const {People,
  Faculty,
  Student,
  Nssvolunteer,
  Farmhead,
  Socialhead,
  Splvolunteer} = require("../models/people");

exports.getLogin = (req,res,next)=>{
    if(req.session.isLoggedIn){
        return  res.redirect('/');
      }
    res.render('login');
}

exports.postLogin = async (req,res,next)=>{
    const id = req.body.id;
    const firstname = req.body.firstname;
    const password = req.body.password;
    const role = req.body.role;

    if((id == '') || (password == '') || (role == ''))
      res.redirect('/login');

    if(role=="Admin"){
      try{
        const admin = await Admin.findOne({where:{id: id, Password: password}})
      
        if(admin == null)
            {res.redirect('/login');}
        else {
            req.session.isLoggedIn=true;
            req.session.user=admin;
            req.session.role=role;
            req.session.save(err=>{
            console.log(err);
            res.redirect('/admin/addperson');
          });
        }
      }
    catch(err){console.log(err)};
      
      // People.findByPk(1)
      // .then(ppl=>{
      //   console.log("Well I am Here!!!");
      //   req.session.isLoggedIn=true;
      //   req.session.user=ppl;
      //   req.session.role=role;
      //   res.redirect('/addperson');
      // })
    }
    else{
      let categoryUser;
      switch(role){
        case 'Farmhead': 
          categoryUser = await Farmhead.findByPk(id);
          break;
        case 'Nssvolunteer': 
        categoryUser = await Nssvolunteer.findByPk(id);
          break;
        case 'Student':
          categoryUser = await Student.findByPk(id);
          break;
        case 'Socialhead':
          categoryUser = await Socialhead.findByPk(id);
          break;
        case 'Faculty':
          categoryUser = await Faculty.findByPk(id);
            break;
        case 'Splvolunteer':
          categoryUser = await Splvolunteer.findByPk(id);
          break;
        default:
          res.redirect('/login');
          break;
      }
      People.findOne({where:{id: categoryUser.personId, Password: password}})
    .then(people=>{
      if(people == null)
      {res.redirect('/login');}
      else 
        {
          req.session.isLoggedIn=true;
          req.session.user=people;
          req.session.role=role;
          req.session.save(err=>{
            switch(role){
              case 'Farmhead': 
                res.redirect('/farmhead');
                break;
              case 'Nssvolunteer': 
                res.redirect('/nssvolunteer');
                break;
              case 'Student':
                res.redirect('/student');
                break;
              case 'Socialhead':
                res.redirect('/socialhead');
                break;
              case 'Faculty':
                  res.redirect('/faculty');
                  break;
              case 'Splvolunteer':
                res.redirect('/splprojectvolunteer');
                break;
              default:
                res.redirect('/login');
                break;
            }
        })}
    })
    .catch(err=>console.log(err))
    }
    
}

exports.getPerson = (req,res,next)=>{
    console.log(req.session.isLoggedIn);
    console.log(req.user);
    if(!req.session.isLoggedIn){
      return  res.redirect('/login');
    }
    res.render('people',{
        name: req.session.user.FirstName,
        role: req.session.role
    })
}

exports.postLogout = (req, res, next) => {
    console.log("DELETING SESSION!!!!!");
    req.session.destroy(err => {
      console.log(err);
      console.log("LOGGED OUT!!!")
      res.redirect('/login');
    });
  };

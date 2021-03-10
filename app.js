const path = require('path');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const SequelizeStore =require('connect-session-sequelize')(session.Store);
const {People,
    Faculty,
    Student,
    Nssvolunteer,
    Farmhead,
    Socialhead,
    Splvolunteer} = require('./models/people');
const { Group,
    Activity,
    Farmwork,
    Socialwork,
    Splprojectgrp
} = require('./models/group');
const {StudentFarmwork,
  StudentSocialwork} = require('./models/junctiontables');
const Admin = require('./models/admin');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const farmheadRoutes = require('./routes/farmhead');
const studentRoutes = require('./routes/student');
const nssvolunteerRoutes = require('./routes/nssvolunteer');
const splvolunteerRoutes = require('./routes/splprojectvolunteer');
const facultyRoutes = require('./routes/faculty');
const socialheadRoutes = require('./routes/socialhead');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: new SequelizeStore({
        db: sequelize,
      })
    })
  );

  app.use((req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log("HERE not logged!!!!!!");
      return next();
    }
    
    console.log("HERE before finding!!!!!!");
    console.log(req.session);
    if(req.session.role=="Admin"){
      Admin.findByPk(req.session.user.id)
      .then(admin=>{
        req.user=admin;
        next();
      })
      .catch(err=>console.log(err));
    }
    else{
      People.findByPk(req.session.user.id)
      //People.findByPk(1)
        .then(user => {
          console.log("HERE!!!!!!");
          req.user = user;
          next();
        })
        .catch(err => console.log(err));
    }
    
  });

app.use(authRoutes);
app.use(adminRoutes);
app.use(farmheadRoutes);
app.use(studentRoutes);
app.use(nssvolunteerRoutes);
app.use(splvolunteerRoutes);

app.use(facultyRoutes);
app.use(socialheadRoutes);


app.use('/',(req,res,next)=>{
    let user = req.user;
    if(user==null){
      user="Nobody Logged in!!";
    }
    res.send(user)
})

Faculty.hasMany(Student);
Student.belongsTo(Faculty);
Faculty.belongsTo(People);
Student.belongsTo(People);
Nssvolunteer.belongsTo(People);
Farmhead.belongsTo(People);
People.hasOne(Farmhead);
// People.hasOne(Socialhead);
Socialhead.belongsTo(People);
Splvolunteer.belongsTo(People);

Activity.belongsTo(Group);
Splprojectgrp.belongsTo(Group);
Farmwork.belongsTo(Activity);
Socialwork.belongsTo(Activity);

Farmhead.hasMany(Farmwork);
Socialhead.hasMany(Socialwork);
Splvolunteer.hasMany(Splprojectgrp);
Nssvolunteer.hasMany(Farmwork);
Nssvolunteer.hasMany(Socialwork);

Splvolunteer.hasMany(Student);


Splprojectgrp.hasMany(Student);
Student.belongsTo(Splprojectgrp);

Student.belongsToMany(Farmwork,{through: StudentFarmwork});
Farmwork.belongsToMany(Student,{through: StudentFarmwork});

Student.belongsToMany(Socialwork,{through: StudentSocialwork});
Socialwork.belongsToMany(Student,{through: StudentSocialwork});

sequelize
//  .sync({ force: true })
  .sync()
  .then(result => {
    return People.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return People.create({ FirstName: "Goutham", LastName: "P", Password: "123", Department: "CSED" });
    }
    return user;
  })
  // .then(result => {
  //   return Admin.create({ FirstName: "Gnanesh", LastName: "D", Password: "123"})
  // })
  .then(result=>{
    console.log("Using Student to get the person he/she is!");
    console.log(result);
  })
  .then(result=>{
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


// app.listen(3000,()=>{
//     console.log("Node server is up");
// })
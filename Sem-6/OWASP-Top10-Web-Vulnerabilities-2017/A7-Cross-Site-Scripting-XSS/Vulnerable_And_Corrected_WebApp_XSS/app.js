const express = require("express");
const app = express();
const sequelize = require('./util/database');

const session = require('express-session');
const bodyParser = require('body-parser');
const SequelizeStore =require('connect-session-sequelize')(session.Store);

const User = require('./models/user');
const Post = require('./models/post');

const authRoutes = require('./routes/login');
const xssRoutes = require('./routes/xss');

app.use(express.static(__dirname + 'public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
      secret: 'my secret1',
      resave: false,
      cookie: { httpOnly: false},
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

    User.findByPk(req.session.user.id)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>console.log(err));
    
  });

app.use(authRoutes);
app.use(xssRoutes);

User.hasMany(Post);
Post.belongsTo(User);

sequelize
//.sync({ force: true })
.sync()
.then(result=>{
    return User.findByPk(1);
})
.then(user=>{
    if(!user){
        return User.create({UserName: "Goutham", Password: "123", Qualification: "Btech CSE, NITC"});
    }
})
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})
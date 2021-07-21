// Shows 3 different methods of preventing sql injection by changing the sql statement
// You can find all the three methods in /controllers/auth1.js
const path = require('path')
const os = require('os')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const fs = require('fs')
const adminRoutes = require('./routes/admin1')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const temp = require('./util/database')
const sequelize = require('./util/database1')

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.set('view engine','ejs')
app.set('views','views')


app.use(
    session({
        secret: 'my secret',
        resave: false,
        cookie: {httpOnly: false},
        saveUninitialized: false,
        store: new SequelizeStore({
             db: sequelize,
         })
    })
)

sequelize.sync()

app.use((req,res,next)=>{
    if(!req.session.isLoggedIn){
        console.log("here not logged in !!!")
        // res.status(404).render('login.ejs',{url: '/login'})
        console.log("Hello")
        return next()
    }
    next()
})

app.use(adminRoutes)

app.listen(3000)

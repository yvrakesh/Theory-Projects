const path = require('path')
const os = require('os')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const fs = require('fs')
const adminRoutes = require('./routes/admin')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
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



app.use((req,res,next)=>{
    if(!req.session.isLoggedIn){
        console.log("here not logged in !!!")
        return next()
    }
    next()
})

app.use(adminRoutes)

app.listen(3000)

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const queryString = require('querystring')
const cookieparser = require('cookie-parser')



TIME_SESSION = 1000*60*60*10
const {
    PORT = 3000,
    SESS_LIFETIME = TIME_SESSION,
    SESS_NAME ='sid'
} = process.env

const users = [
    { id: 1, name: 'Alex', email:'alex@abc.com', password:'123'},
    { id: 2, name: 'John', email:'john@abc.com', password:'secret'},
    { id: 3, name: 'Mary', email:'mary@abc.com', password:'secret'},
]

const app = express()
app.use(cookieparser());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: 'http',
    cookie: {
        httpOnly: false,
        maxAge: SESS_LIFETIME,
        sameSite: true,  
    }
    
}))

const redirectLogin = (req, res, next) => {
    if(!req.cookies.userid){
        res.redirect('/login')
    }
    else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if(req.cookies.userid){
        res.redirect('/home?userid='+req.cookies.userid)
    }
    else {
        next()
    }
}

app.get('/', (req,res) =>{
    // console.log(req.session)
    console.log(req.cookies.userid)
    if(req.cookies.userid){
    const  userId  = req.cookies.userid
    console.log(userId)
    res.send(`
    <h1>Welcome!</h1>
    ${userId ? `<a href='/home?userid=${userId}'>Home</a>
    <form method ='post' action='/logout'>
        <button>Logout</button>
    </form>` : `<a href='/login'>Login</a>
    <a href='/register'>Register</a>`}
    

    
    `)
    }
    else{
        res.send(`
    <h1>Welcome!</h1>
    <a href='/login'>Login</a>
    <a href='/register'>Register</a>
    `)
    }
})

app.get('/home',redirectLogin, (req,res) =>{

    var uid = (req.cookies.userid)
    console.log(req.cookies.userid)
    const user = users.find(
        user => user.id === Number(uid))
    // console.log(user)
    res.send(`
    <h1>Home</h1>
    <a href='/'>Main</a>
    <ul>
        <li>Name:${user.name}</li>
        <li>Email:${user.email} </li>
        </ul>
        `)

})

app.get('/login',redirectHome, (req,res) =>{

    res.send(`
    <h1>Login</h1>
    <form method ='post' action='/login'>
        <input type ='email' name='email' placeholder='Email' required />
        <input type ='password' name='password' placeholder='Password' required />
        <input type ='submit' />
    </form>
    <a href='/register'>Register</a>
    `)

})

app.get('/register',redirectHome, (req,res) =>{

    res.send(`
    <h1>Register</h1>
    <form method ='post' action='/register'>
        <input name='name' placeholder='Name' required />
        <input type ='email' name='email' placeholder='Email' required />
        <input type ='password' name='password' placeholder='Password' required />
        <input type ='submit' />
    </form>
    <a href='/login'>Login</a>
    `)

    
})

app.post('/login',redirectHome, (req, res) =>{
    const { email, password } = req.body
    if(email && password) {
        const user = users.find(
            user => user.email === email && user.password === password
        )

        if(user){
            req.session.userId = user.id
            res.cookie("userid",user.id)
            console.log(req.cookies.userid)
            return res.redirect('/home?userid='+user.id)
        }
    }
    res.redirect('/login')
})

app.post('/register',redirectHome, (req, res) =>{
    const { name, email, password } = req.body
    if(name && email && password) {
        const exists = users.some(
            user => user.email === email
        )
        if(!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password
            }

            users.push(user)
            req.session.userId = user.id

            return res.redirect('/home?userid='+user.id)
        }
    }

    res.redirect('/register')
})

app.post('/logout', redirectLogin, (req, res) =>{
    req.session.destroy(err => {
        if(err){
        return res.redirect('/home')
        }

        res.clearCookie(SESS_NAME)
        res.clearCookie('userid')
        res.redirect('/login')
    })
})

app.listen(PORT, () => console.log(
    `http://localhost:${PORT}`
))

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

var users = [
    { id: 1, name: 'Alex', email:'alex@abc.com', password:'123', type:'user'},
    { id: 2, name: 'John', email:'john@abc.com', password:'secret', type:'user'},
    { id: 3, name: 'Mary', email:'mary@abc.com', password:'secret', type:'user'},
    { id: 4, name: 'admin', email:'admin@abc.com', password:'admin', type:'admin'},
]

var count = 4

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
    var type= Number(req.query.usertype);
    console.log("type:"+type);
    if(!req.cookies.userid && Number(req.query.usertype)){
        res.redirect('/login')
    }
    else if(!req.cookies.userid && !Number(req.query.usertype)){
        res.redirect('/adminlogin')
    }
    else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if(req.cookies.userid && Number(req.query.usertype)){
        res.redirect('/home?userid='+req.cookies.userid+'&usertype=1')
    }
    else if(req.cookies.userid && !Number(req.query.usertype)){
        res.redirect('/homeadmin?userid='+req.cookies.userid+'&usertype=0')
    }
    else {
        next()
    }
}

app.get('/', (req,res) =>{
    // console.log(req.session)
    // console.log(req.cookies.userid)
    if(req.cookies.userid){
    const  userId  = req.cookies.userid
    // console.log(userId)
    res.send(`
    <h1>Welcome!</h1>
    ${userId ? `<a href='/home?userid=${userId}'>Home</a>
    <form method ='post' action='/logout'>
        <button>Logout</button>
    </form>` : `<a href='/login'>Login</a>
    <a href='/adminlogin'>Admin Login</a>
    <a href='/register'>Register</a>`}
    

    
    `)
    }
    else{
        res.send(`
    <h1>Welcome!</h1>
    <a href='/login'>Login</a>
    <a href='/adminlogin'>Admin Login</a>
    <a href='/register'>Register</a>
    `)
    }
})

app.get('/home',redirectLogin, (req,res) =>{

    var uid = (req.query.userid)
    console.log(req.query)
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

app.get('/homeadmin',redirectLogin, (req,res) =>{

    var uid = (req.query.userid)
    console.log(req.query.userid)
    const user = users.find(
        user => user.type === 'user')
    // console.log(user)
    // console.log(users[1])
    res.write(`<h1>Admin Home</h1>`)
    res.write(`<a href='/'>Main</a>`)
    for(var i=0;i<count;i++)
    {
        // user = users[i]
        console.log(users[i])
        if(users[i].type==='user'){
        res.write(`<li>Name:${users[i].name}</li>`)
        res.write(`<li>Email:${users[i].email}</li>`)}
    }
    res.end()
    // res.send(`
    // <h1>Admin Home</h1>
    // <a href='/'>Main</a>
    // <ul>
    //     <li>Name:${user.name}</li>
    //     <li>Email:${user.email} </li>
    //     </ul>
    //     `)

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

app.get('/adminlogin',redirectHome, (req,res) =>{

    res.send(`
    <h1>Login Admin</h1>
    <form method ='post' action='/adminlogin'>
        <input type ='email' name='email' placeholder='Email' required />
        <input type ='password' name='password' placeholder='Password' required />
        <input type ='submit' />
    </form>
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
            return res.redirect('/home?userid='+user.id+'&usertype=1')
        }
    }
    res.redirect('/login')
})

app.post('/adminlogin',redirectHome, (req, res) =>{
    const { email, password } = req.body
    console.log(email,password)
    if(email && password) {
        const user = users.find(
            user => user.email === email && user.password === password
        )

        if(user){
            req.session.userId = user.id
            console.log('Hello'+user.type)
            if(user.type === 'admin'){
            res.cookie("userid",user.id)
            console.log("Hello"+req.cookies.userid)
            return res.redirect('/homeadmin?userid='+user.id+'&usertype=0')}
            else
            {
                return res.redirect('/login')
            }
        }
    }
    res.redirect('/adminlogin')
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
            count = count + 1

            return res.redirect('/home?userid='+user.id+'&usertype=1')
        }
    }

    res.redirect('/register')
})

app.post('/logout', redirectLogin, (req, res) =>{
    req.session.destroy(err => {
        if(err){
        return res.redirect('/')
        }

        res.clearCookie(SESS_NAME)
        res.clearCookie('userid')
        res.redirect('/')
    })
})

app.listen(PORT, () => console.log(
    `http://localhost:${PORT}`
))

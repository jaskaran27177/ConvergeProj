import dotenv from 'dotenv'
if(process.env.NODE_ENV!=='production'){
    dotenv.config()
}
import express from 'express'
import bodyParser from "body-parser"
import todoRoutes from './routes/todo.js'
import loginRoutes from './routes/login.js'
import registerRoutes from './routes/register.js'
import passport from 'passport'
import initializepassport from './controllers/passport.js'
import flash from 'express-flash'
import session  from 'express-session'
import methodoveride from 'method-override'
import {checknotAuthenticated,checkAuthenticated} from "./controllers/auth.js"


export let users=[]
const app= express()
const PORT=5001
initializepassport(
    passport, 
    email=> users.find(user=>user.email===email),
    id=>users.find(user=>user.id===id)
    )
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(methodoveride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use('/style', express.static('style'));


app.use('/todos',checkAuthenticated,todoRoutes)
app.get('/',(req,res)=>{
    res.redirect('/login')
})
app.use('/login',checknotAuthenticated,loginRoutes)
app.use('/register',checknotAuthenticated,registerRoutes)
app.delete('/logout',(req,res)=>{
    req.logout(function(err) {
    if (err) { return next(err); }
    // res.redirect('/');
  });
    res.redirect('/login')
})

app.listen(PORT,()=> console.log(`Server running on port http://localhost:${PORT}`))

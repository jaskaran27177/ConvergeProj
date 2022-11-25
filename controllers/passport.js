
import local from 'passport-local'
import bcrypt from 'bcrypt'
const localstrategy =local.Strategy

export default function initialize(passport,getuserbyemail,getuserbyid){
    const authenticateUser=async (email,password,done)=>{
        const user=getuserbyemail(email)
        if (user==null){
            return done(null,false,{message:'No user with that email'})
        }
        try{
            if (await bcrypt.compare(password,user.password)){
                done(null,user)
            }
            else{
                done(null,false,{message:'password incorrect'})
            }
        }
        catch{
            done(e)
        }
    }
    passport.use(new localstrategy({usernameField:'email'}, authenticateUser))
    passport.serializeUser((user,done)=>done(null,user.id))
    passport.deserializeUser((id,done)=>{done(null,getuserbyid(id))})
}
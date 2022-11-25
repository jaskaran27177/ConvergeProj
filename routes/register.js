import express  from "express";
import {users} from '../index.js'
import bcrypt from 'bcrypt'
const router =express.Router()

router.get('/',(req,res)=>{
    res.render('register',{message:null})
})
router.post('/',async (req,res)=>{
    let found=0
    try{
    users.forEach(user=>{
        if (user.email===req.body.email){
            found=1
        }
    })
    if (found==0){
        const userpassword=req.body.password
        const hpassword=await bcrypt.hash(userpassword,10)
        users.push({
            id: Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hpassword
        })
        res.redirect('/login')
    }
    else{
        res.render('register',{message:'Email already exists'})
    }
    }catch(error){
        console.log(error)
        res.render('register',{message:null})
    } 
})

export default router
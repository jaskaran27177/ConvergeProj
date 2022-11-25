import express  from "express";

import passport from 'passport'
const router =express.Router()
router.post('/',passport.authenticate('local',{
    successRedirect:'/todos',
    failureRedirect:"/login",
    failureFlash:true
}))
router.get('/',(req,res)=>{
    res.render('login')
})
export default router
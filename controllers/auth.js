
export function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}
export function checknotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/todos')
    }
    next()
}
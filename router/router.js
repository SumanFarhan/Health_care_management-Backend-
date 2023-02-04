const routes = require('express').Router();
const userController = require('../Controller/userController');
const passport=require('passport')

routes.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            success:true,
            message:"Successfully Google Login",
            user:req.user,
            // cookies:req.cookies
        })
    }
   
})

routes.get("/login/failed",(req,res)=>{
    res.status(401).json({
        success:false,
        message:"Failure Google Login"
    })
})

routes.get("/logout",(req,res)=>{
    req.logout()
    res.redirect("http://localhost:3000/")
})

routes.get('/google',passport.authenticate('google',{scope:["profile"]}))
routes.get('/google/callback',passport.authenticate("google",
{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"/login/failed"
}
))

routes.post('/signupUser', userController.addUser);
routes.post('/loginUser', userController.findUser);


module.exports = routes;

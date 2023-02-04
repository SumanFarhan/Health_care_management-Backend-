const routes = require('express').Router();
const userController = require('../Controller/userController');
const passport=require('passport')
const User = require('../Model/userModel');

routes.get("/login/success",(req,res)=>{
    if(req.user){
        // res.send(req.user)
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

routes.get('/auth/google',passport.authenticate('google',{scope:["profile",'email']}))

routes.get('/auth/google/callback', 
  passport.authenticate('google', { 
    // successRedirect:"http://localhost:3007/login/success",
    failureRedirect: 'http://localhost:3000/login/failed' 
}),
  (req, res) => {
    // Successful authentication, save user to MongoDB
    User.findOne({ googleId: req.user.id }, (err, user) => {
      if (err) { return res.send(err); }
      if (user) { return res.redirect('http://localhost:3000/dashboard'); }
    //   console.log('inside user')

      const newUser = new User({ googleId: req.user.id ,name:req.user.displayName,email:req.user.emails[0].value});
      newUser.save((saveErr) => {
        // console.log('inside redirect')
        if (saveErr) { return res.send(saveErr); }
        return res.redirect('http://localhost:3000/dashboard');
        
      });
    });
  }
);

// routes.get('/auth/google/callback',passport.authenticate("google",
// {
//     successRedirect:"http://localhost:3000/dashboard",
//     failureRedirect:"/login/failed"
// }
// ))

routes.post('/signupUser', userController.addUser);
routes.post('/loginUser', userController.findUser);


module.exports = routes;

const routes = require('express').Router();
const userController = require('../Controller/userController');
const passport = require('passport')
const User = require('../Model/userModel');

routes.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

// routes.get("/login/success", (req, res) => {
//     const currentUser=req.user
//     // const nameuser=currentUser.name
//     // return res.send(currentUser)
//     // if (req.user) {
//     //     res.status(200).json({
//     //         success: true,
//     //         message: "successful",
//     //         user: req.user,
//     //         //cookies: req.cookies
//     //     });
//     // }
// });

routes.get('/login/success',(req, res) => {
    // Check if a user is logged in
     const current_user= req.user
    //  .then(current_user=>{
    //     res.send(current_user)
    //  })
     console.log(current_user,"from route ")
    if (current_user) {
      // Return the user information in the response
      console.log(current_user,"From if")
      res.send(current_user)
    //   res.json({ user: req.user});
    } else {
      // Return a 401 Unauthorized error if no user is logged in
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

routes.get("/login/failed", (req, res) => {
    res.status(401).json({
        message: "Failure Google Login"
    })
})

routes.get("/logout", (req, res) => {
    req.logout()
    res.redirect("http://localhost:3000/")
})

routes.get('/auth/google', passport.authenticate('google', { scope: ["profile", 'email'] }))

routes.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: "http://localhost:3000/dashboard",
        failureRedirect: 'http://localhost:3000/login/failed'
    }),
    (req, res) => {
        
        // Successful authentication, save user to MongoDB
        User.findOne({ googleId: req.user.id }, (err, user) => {
            if (err) { return res.send(err); }
            if (user) { return res.redirect("http://localhost:3000/dashboard")}

            const newUser = new User({ googleId: req.user.id, name: req.user.displayName, email: req.user.emails[0].value });
            newUser.save((saveErr) => {
                if (saveErr) { return res.send(saveErr); }
                return res.redirect("http://localhost:3000/dashboard");
            });
            res.json({user:req.user})
        });

    }

);



routes.post('/signupUser', userController.addUser);
routes.post('/loginUser', userController.findUser);


module.exports = routes;

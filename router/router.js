const routes = require('express').Router();
const userController = require('../Controller/userController');
const passport = require('passport')
const User = require('../Model/userModel');



routes.get('/login/success', (req, res) => {
    // res.send(req.user)
    console.log(req.user, "from route ")
    // User.findOne({ email: req.user.emails[0].value })
    // .exec((err, user) => {
    //     if (!user) {
    //         console.log(req.user,"From if")
    //     return res.status(400).json({message:'Unauthorized'})
    //     }else{
    //         res.json({ user: req.user})
    //     }
    // })
    if (req.user) {
        // Return the user information in the response
        console.log(req.user, "From if")
        // res.send(req.user)
        res.json({ user: req.user });
    } else {
        // Return a 401 Unauthorized error if no user is logged in
        res.status(401).json({ error: 'Unauthorized' });
    }
});


routes.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie('connect.sid');
            res.redirect('http://localhost:3000/');
        }
    });
});

routes.get('/auth/google', passport.authenticate('google', { scope: ["profile", 'email'] }))

routes.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: "http://localhost:3000/dashboard",
        failureRedirect: 'http://localhost:3000/login/failed'
    }),
    (req, res) => {
        User.findOne({ googleId: req.user.id }, (err, user) => {
            if (err) { return res.send(err); }
            if (user) { return res.json({ user: req.user }) }

            const newUser = new User({ googleId: req.user.id, name: req.user.displayName, email: req.user.emails[0].value });
            newUser.save((saveErr) => {
                if (saveErr) { return res.send(saveErr); }
                return res.json({ user: req.user });
            });
            res.json({ user: req.user })
        });

    }

);

routes.post('/signupUser', userController.addUser);
routes.post('/loginUser', userController.findUser);


module.exports = routes;

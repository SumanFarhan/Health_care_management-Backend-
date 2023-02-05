const passport = require('passport');
const User = require('./Model/userModel');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '382353007669-7jcpsn13hi13obidoe1aveo23ih3rh9u.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
  async (accessToken, refreshToken, email, cb) => {
    // const defaultUser = {
    //   googleId: email.id,
    //   name: email.displayName,
    //   email: email.emails[0].value
    // }

    // const user = await User.findorCreate({ where: { googleId: email.id }, defaults: defaultUser }).catch((err)=>{
    //   console.log(err)
    //   cb(err,null)
    // })

    // if(user && user[0]) return cb(null,user && user[0])

    // passport callback function
    // accessToken is the token to call Google API
    // profile is the user's profile information from Google
    // console.log('Email',email)
    return cb(null, email);
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});



passport.deserializeUser(async(id, done) => {
  // User.findOne({googleId:id}, (err, user) => {
  //   done(err, user);
  // });
  const user= await User.findOne({googleId:id}).catch((err)=>{
      console.log(err)
      done(err,null)
    })
    if(user) done(null,user)
  
});



// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "/auth/google/callback"
// },
//   function (accessToken, refreshToken, profile, cb) {
//     return cb(null,profile)
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user)
// })

// passport.deserializeUser((user, done) => {
//   done(null, user)
// })
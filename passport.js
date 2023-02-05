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
    return cb(null, email);
  }
));

// Serialize the user for the session
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// Deserialize the user from the session
// passport.deserializeUser((user, done) => {
//   console.log(user,"From deserialize")
//   done(null, user);
// });

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




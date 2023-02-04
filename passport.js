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
(accessToken, refreshToken, email, cb) => {
  // passport callback function
  // accessToken is the token to call Google API
  // profile is the user's profile information from Google
  // console.log('Email',email)
  return cb(null, email);
}
));


passport.deserializeUser((user, done) => {
  done(null, user)
})
passport.serializeUser((user, done) => {
done(null, user.id);
});

// passport.deserializeUser((id, done) => {
//   // done(null, id)
// User.findById(id, (err, user) => {
//   done(err, user);
// });
// });

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
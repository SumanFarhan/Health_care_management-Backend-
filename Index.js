const express = require('express');
const app = express();
const routes = require('./router/router')
const mongoose = require('mongoose');
const cors=require('cors')
const cookieSession=require('cookie-session');
const passport = require('passport');
const passportSetup=require('./passport')


mongoose.set('strictQuery', false)
try {
    mongoose.connect('mongodb+srv://root:root@cluster0.vyb7aac.mongodb.net/Healthcaredb',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    .then(console.log('DB connection'))
} catch (error) {
    console.log('Error in DB connection');
}

process.on('UnhandledRejection', error => {
    console.log('DB error', error);
});
  
app.use(
    cookieSession(
    {name: "session" , 
    keys: ["lama"], 
    maxAge: 24 * 68 * 60 * 100})
    )
app.use(passport.initialize())
// app.use(passport.session())
app.use(cors({
    origin:"http://localhost:3000/",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

let port=process.env.PORT || 3007

app.listen(port,()=>{
    console.log(`App listening on ${port}`)
})
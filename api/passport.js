const passport = require('passport');
const passportJWT = require('passport-jwt'); 
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const User = mongoose.model('User');

passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done){
        console.log(username, password)
        User.findOne({userName: username}, function(err, user){
            if(err) return done(err);
            if(!user){
                return done(null, false, {
                    message: 'Could not login with those details.'
                });
            }
            if(!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Could not login with those details.'
                });
            }
            return done(null, user, {
                message: 'You are now logged in.'
            });
        })   
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, function(jwtPayload, done){
    const o_id = new ObjectId(jwtPayload._id);
    console.log('payload received', jwtPayload);
    User.findOne({"_id" : o_id}, (err, user) => {
        console.log(user);
        if(user){
            return done(null, user)
        } else {
            return done(null, false)
        }
        if( err ){
            return done(err, false)
        }
    })
}))


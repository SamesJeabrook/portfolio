require('dotenv').config({path: __dirname+'/.env'});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const keys = require('./config/keys');
const User = require('./models/user');
require('./api/passport');

const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');

const app = express();

const PORT = process.env.PORT || 3001;
mongoose.connect(keys.mongoURI);
app.set('superSecret', keys.secret);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));

// app.use('/api/users', passport.authenticate('jwt', {session: false}, User))


app.get('/setup', function(req, res){
    var me = new User()
    
    me.userName = 'samesJeabrook';
    me.email = 'james.seabrook77@googlemail.com';

    me.setPassword('fucksake');

    me.save(function(err){
        let token;
        if(err){
            res.status(400);
            res.json({"status" : "fail", "message" : err});
        }else{
            token = User.generateJwt();
            res.status(200);
            res.json({"status" : "success", "token" : token });
        }
        console.log('User saved successfully');
    })
});

app.use('/api/users', authRoutes);

app.get('/api/user', function(req, res){
    User.findOne({userName: "samesJeabrook"}, function(err, user){
        res.status(200);
        res.send(user)
    });
})

// app.post('/api/login', function(req, res){
//     console.log(req.body)
//     if(!req.body.userName || !req.body.password ) {
//         res.status(400),
//         res.json({"status" : "fail", "message" : "All fields required"});
//         return;
//     }

//     passport.authenticate('local', function(err, User, info){
//         let token;

//         if(err){
//             res.status(400),
//             res.json({"status" : "fail", "message" : err});
//             return;
//         }

//         if(User){
//             token = User.generateJwt();
//             res.status(200);
//             res.json({"status" : "success", "token" : token });

//         }else{
//             console.log(res);
//             res.status(401);
//             res.json({"status" : "fail", "message" : info });
//         }
//     })(req, res);
// })

// app.use('/api/users', passport.authenticate('jwt', {session: false}), User);

app.listen(PORT);
console.log("listening on port: "+PORT)
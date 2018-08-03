const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

require('../api/passport');

const User = require('../models/user');

router.get('/setup', function(req, res){
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

/* GET users listing. */

router.get('/', function(req, res){
  User.findOne({userName: "samesJeabrook"}, function(err, user){
      res.status(200);
      res.send(user)
  });
});

router.get('/test/', passport.authenticate('jwt', {session: false}), function(req, res){
  res.json({"status" : "success", "message" : "You can not see this without being authenticated"})
})

router.post('/login', function(req, res){
  if(!req.body.userName || !req.body.password ) {
      res.status(400),
      res.json({"status" : "fail", "message" : "All fields required"});
      return;
  }

  passport.authenticate('local', function(err, User, info){
      let token;

      if(err){
          res.status(400),
          res.json({"status" : "fail", "message" : err});
          return;
      }

      if(User){
          token = User.generateJwt();
          res.status(200);
          res.json({"status" : "success", "token" : "bearer "+token });

      }else{
          res.status(401);
          res.json({"status" : "fail", "message" : info });
      }
  })(req, res);
})

// find user information
router.get('/bio/:userName', function(req, res){
  User.findOne({userName: req.params.userName}, (err, user, info) => {
    if(err){
      res.status(400);
      res.json({"status" : "fail", "message" : err})
    }
    if(user){
      res.status(200);
      res.json({"status" : "success", "data": user});
    }else{
      res.status(401);
      res.json({"status" : "fail", "message" : info})
    }

  })
});

// update user information

router.post('/bio/update', passport.authenticate('jwt', {session: false}), function(req, res){
  if(req.body.id){
    console.log(req.body);
      User.findByIdAndUpdate(req.body.id, {
        aboutMe: req.body.aboutMe,
        aboutWork: req.body.aboutWork,
        tagLine: req.body.tagLine
      }, function(err, user){
        if(err){
          res.status(400);
          res.json({"status" : "fail", "message" : err})
        }
        if(user){
          res.status(200);
          res.json({"status" : "success", "data": user});
        }else{
          res.status(401);
          res.json({"status" : "fail", "message" : info})
        }
      })
  }
});


module.exports = router;

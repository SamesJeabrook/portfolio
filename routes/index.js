var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Skills = require('../models/skills');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello! The API is at /api/');
});

// GET setup

router.get('/setup/user', function(req, res){
  var me = new User()
  
  me.userName = 'samesJeabrook';
  me.email = 'james.seabrook77@googlemail.com';
  me.aboutMe = 'About Me Text';
  me.aboutWork = 'About My Work Text';
  me.tagLine = 'Ui / Ux tinkerer';

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
  });
});

router.get('/setup/skills', function(req, res){
    var skills = new Skills()

    skills.skillName = 'HTML',
    skills.skillPercent = 100

    skills.save(function(err){
        if(err){
            res.status(400);
            res.json({"status" : "fail", "message" : err});
        }else{
            res.status(200);
            res.json({"status" : "success" });
        }
    });
})

router.get('/logout/', function(req, res){
    req.logout();
    res.status(200);
    res.json({"status": "success", "message": "You are logged out"})
})

module.exports = router;

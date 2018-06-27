const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('../api/passport');

const Skills = require('../models/skills');

// update - create skills list

router.post('/update', passport.authenticate('jwt', {session: false}), function(req, res){
    if(req.body.id){
        console.log('updating skill id: ', req.body.id);
        Skills.findByIdAndUpdate(req.body.id, {
            skillName: req.body.skillName,
            skillPercent: req.body.skillPercent
        }, function(err, skill){
            if(err){
                res.status(400);
                res.json({"status": "fail", "message": err});
            }
            if(skill){
                res.status(200);
                res.json({"status": "success", "data": skill});
            }else{
                res.status(401);
                res.json({"status": "fail", "message": info})
            }
        })
    }else{
        console.log('Creating new skill with: ', req.body);
        var skills = new Skills()

        skills.skillName = req.body.skillName,
        skills.skillPercent = req.body.skillPercent

        skills.save(function(err){
            if(err){
                res.status(400);
                res.json({"status" : "fail", "message" : err});
            }else{
                res.status(200);
                res.json({"status" : "success" });
            }
        });
    }
});
  
// get all skills in list
  
router.get('/list', function(req, res){
    Skills.find({},(err, skills, info) => {
        if(err){
            res.status(400);
            res.json({"status" : "fail", "message" : err})
        }
        if(skills){
            res.status(200);
            res.json({"status" : "success", "data": skills});
        }else{
            res.status(401);
            res.json({"status" : "fail", "message" : info})
        }
    })
});

// delete skill

router.post('/delete', passport.authenticate('jwt', {session: false}), function(req, res){
    if(req.body.id){
        Skills.remove({_id: req.body.id}, (err, skills, info) => {
            if(err){
                res.status(400);
                res.json({"status" : "fail", "message" : err})
            }
            if(skills){
                res.status(200);
                res.json({"status" : "success", "data": skills});
            }else{
                res.status(401);
                res.json({"status" : "fail", "message" : info})
            }
        })
    }else{
        res.status(500);
        res.json({'status': "fail", "messsage": "No ID has been specified to remove skill"});
    }
})

module.exports = router;
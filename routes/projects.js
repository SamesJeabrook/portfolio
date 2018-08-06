const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require("fs");
const crypto = require('crypto');

require('../api/passport');

const Projects = require('../models/projects');

const storage = multer.diskStorage({
    destination: './public/images',
    filename(req, file, callback){
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

// update - create Projects list

router.post('/update', passport.authenticate('jwt', {session: false}), upload.fields([
        {name: 'projectHeroImage', maxCount: 1},
        {name: 'projectImageDesktop', maxCount: 1},
        {name: 'projectImageMobile', maxCount: 1},
        {name: 'projectScreenshot1', maxCount: 1},
        {name: 'projectScreenshot2', maxCount: 1},
        {name: 'projectScreenshot3', maxCount: 1}
    ]), function(req, res){
    const projects = new Projects();
    if(req.body.id){
        const updateProjects = {}
        updateProjects.projectTitle = req.body.projectTitle,
        updateProjects.projectDesc = req.body.projectDesc,
        updateProjects.projectDescShort = req.body.projectDescShort,
        updateProjects.projectDetail = req.body.projectDetail,
        updateProjects.projectChallenges = req.body.projectChallenges,
        updateProjects.projectLikes = req.body.projectLikes,
        updateProjects.projectImprovements = req.body.projectImprovements,
        updateProjects.projectLinkTo = req.body.projectLinkTo,
        req.files.projectHeroImage ? updateProjects.projectHeroImage = req.files.projectHeroImage[0].path : null,
        req.files.projectImageDesktop ? updateProjects.projectImageDesktop = req.files.projectImageDesktop[0].path : null,
        req.files.projectImageMobile ? updateProjects.projectImageMobile = req.files.projectImageMobile[0].path : null,
        req.files.projectScreenshot1 ? updateProjects.projectScreenshot1 = req.files.projectScreenshot1[0].path : null,
        req.files.projectScreenshot2 ? updateProjects.projectScreenshot2 = req.files.projectScreenshot2[0].path : null,
        req.files.projectScreenshot3 ? updateProjects.projectScreenshot3 = req.files.projectScreenshot3[0].path : null,
        console.log('updating project id: ', req.body.id);
        
        Projects.findByIdAndUpdate(req.body.id, updateProjects, function(err, skill){
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
        console.log(req.body)
        console.log(req.files.projectImageDesktop)
        projects.projectTitle = req.body.projectTitle;
        projects.projectDesc = req.body.projectDesc;
        projects.projectDescShort = req.body.projectDescShort;
        projects.projectDetail = req.body.projectDetail;
        projects.projectChallenges = req.body.projectChallenges;
        projects.projectLikes = req.body.projectLikes;
        projects.projectImprovements = req.body.projectImprovements;
        projects.projectLinkTo = req.body.projectLinkTo;
        req.files.projectHeroImage ? updateProjects.projectHeroImage = req.files.projectHeroImage[0].path : null,
        req.files.projectImageDesktop ?  projects.projectImageDesktop = req.files.projectImageDesktop[0].path : null
        req.files.projectImageMobile ? projects.projectImageMobile = req.files.projectImageMobile[0].path : null;
        req.files.projectScreenshot1 ? projects.projectScreenshot1 = req.files.projectScreenshot1[0].path : null;
        req.files.projectScreenshot2 ? projects.projectScreenshot2 = req.files.projectScreenshot2[0].path : null;
        req.files.projectScreenshot3 ? projects.projectScreenshot3 = req.files.projectScreenshot3[0].path : null;

        projects.save(function(err){
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
  
// get all Projects in list
  
router.get('/list', function(req, res){
    Projects.find({},(err, Projects, info) => {
        if(err){
            res.status(400);
            res.json({"status" : "fail", "message" : err})
        }
        if(Projects){
            res.status(200);
            res.json({"status" : "success", "data": Projects});
        }else{
            res.status(401);
            res.json({"status" : "fail", "message" : info})
        }
    })
});

// get all Project item
  
router.get('/item/:id', function(req, res){
    const {id} = req.params;
    Projects.findOne({_id : ObjectId(id)},(err, Projects, info) => {
        if(err){
            res.status(400);
            res.json({"status" : "fail", "message" : err})
        }
        if(Projects){
            res.status(200);
            res.json({"status" : "success", "data": Projects});
        }else{
            res.status(401);
            res.json({"status" : "fail", "message" : info})
        }
    })
});


// delete skill

router.post('/delete', passport.authenticate('jwt', {session: false}), function(req, res){
    if(req.body.id){
        Projects.remove({_id: req.body.id}, (err, Projects, info) => {
            if(err){
                res.status(400);
                res.json({"status" : "fail", "message" : err})
            }
            if(Projects){
                res.status(200);
                res.json({"status" : "success", "data": Projects});
            }else{
                res.status(401);
                res.json({"status" : "fail", "message" : info})
            }
        })
    }else{
        res.status(500);
        res.json({'status': "fail", "messsage": "No ID has been specified to remove the project"});
    }
})

module.exports = router;
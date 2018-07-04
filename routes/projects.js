const express = require('express');
const router = express.Router();
const passport = require('passport');
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

router.post('/update', upload.fields([
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
        updateProjects.projectDetail = req.body.projectDetail,
        updateProjects.projectChallenges = req.body.projectChallenges,
        updateProjects.projectLikes = req.body.projectLikes,
        updateProjects.projectImprovements = req.body.projectImprovements,
        updateProjects.projectLinkTo = req.body.projectLinkTo,
        updateProjects.projectImageDesktop = req.files.projectImageDesktop.path,
        updateProjects.projectImageMobile = req.files.projectImageMobile.path,
        updateProjects.projectScreenshot1 = req.files.projectScreenshot1.path,
        updateProjects.projectScreenshot2 = req.files.projectScreenshot2.path,
        updateProjects.projectScreenshot3 = req.files.projectScreenshot3.path,
        console.log('updating project id: ', req.body.id);
        
        projects.findByIdAndUpdate(req.body.id, updateProjects, function(err, skill){
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
        projects.projectTitle = req.body.projectTitle;
        projects.projectDesc = req.body.projectDesc;
        projects.projectDetail = req.body.projectDetail;
        projects.projectChallenges = req.body.projectChallenges;
        projects.projectLikes = req.body.projectLikes;
        projects.projectImprovements = req.body.projectImprovements;
        projects.projectLinkTo = req.body.projectLinkTo;
        req.files.projectImageDesktop ?  projects.projectImageDesktop = req.files.projectImageDesktop.path : null
        req.files.projectImageMobile ? projects.projectImageMobile = req.files.projectImageMobile.path : null;
        req.files.projectScreenshot1 ? projects.projectScreenshot1 = req.files.projectScreenshot1.path : null;
        req.files.projectScreenshot2 ? projects.projectScreenshot2 = req.files.projectScreenshot2.path : null;
        req.files.projectScreenshot3 ? projects.projectScreenshot3 = req.files.projectScreenshot3.path : null;

        projects.save(function(err){
            if(err){
                res.status(400);
                res.json({"status" : "fail", "message" : err});
            }else{
                res.status(200);
                res.json({"status" : "success" });
            }
            console.log('res data', res);
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
        res.json({'status': "fail", "messsage": "No ID has been specified to remove skill"});
    }
})

module.exports = router;
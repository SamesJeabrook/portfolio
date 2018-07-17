const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require("fs");
const crypto = require('crypto');

require('../api/passport');

const CV = require('../models/CV');

const storage = multer.diskStorage({
    destination: './public/cv',
    filename(req, file, callback){
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

// update - create CV list

router.post('/update', upload.fields([
        {name: 'cv', maxCount: 1}
    ]), function(req, res){
    const CV = new CV();
    if(req.body.id){
        const updateCV = {}
        updateCV.projectTitle = req.body.cvHtml,
        req.files.cvFile ? updateCV.cvFile = req.files.cvFile[0].path : null
        console.log('updating CV id: ', req.body.id);
        
        CV.findByIdAndUpdate(req.body.id, updateCV, function(err, skill){
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
        console.log(req.body.cvHtml)
        console.log(req.files.cvFile)
        req.files.cvFile ?  CV.cvFile = req.files.cvFile[0].path : null

        CV.save(function(err){
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

// get all Project item
  
router.get('/cv/:id', function(req, res){
    const {id} = req.params;
    CV.findOne({_id : ObjectId(id)},(err, CV, info) => {
        if(err){
            res.status(400);
            res.json({"status" : "fail", "message" : err})
        }
        if(CV){
            res.status(200);
            res.json({"status" : "success", "data": CV});
        }else{
            res.status(401);
            res.json({"status" : "fail", "message" : info})
        }
    })
});


// delete skill

router.post('/delete', passport.authenticate('jwt', {session: false}), function(req, res){
    if(req.body.id){
        CV.remove({_id: req.body.id}, (err, CV, info) => {
            if(err){
                res.status(400);
                res.json({"status" : "fail", "message" : err})
            }
            if(CV){
                res.status(200);
                res.json({"status" : "success", "data": CV});
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
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'myEmail@me.com',
        pass: "My password"
    }
})

// send email

router.post('/send', passport.authenticate('jwt', {session: false}), function(req, res){
    if(req.body){
        const emailOptions = {
            from: req.body.geezersEmail,
            to: "myEmail@me.com",
            subject: "Message from "+req.body.geezersName+". Wants to talk about: "+req.body.geezersSubject,
            html: "<p>" + req.body.geezersDescription + "<p/>"
        }

        transporter.sendMail(emailOptions, function(error, info){
            if(error){
                res.status(400);
                res.json({"status": "fail", "message": "Failed to send email"});
                console.log(error);
            }else{
                res.status(200);
                res.json({"status": "success", "message": "Message sent"});
                console.log("Email sent: "+info.response);
            }
        })
    }else{
        res.status(500)
        res.json({"status": "fail", "message": "No fields for sending"})
    }
})

module.exports = router;
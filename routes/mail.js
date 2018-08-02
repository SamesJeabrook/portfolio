const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let smtpConfig = {
    host: 'send.one.com',
    port: 465,
    secure: true,
    auth: {
        user: 'its-me@jamesseabrook.com',
        pass: 'Archer0201'
    }
}

const transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });

// send email

router.post('/send', function(req, res){
    if(req.body){
        const emailOptions = {
            from: "its-me@jamesseabrook.com",
            to: "its-me@jamesseabrook.com",
            subject: "Message from "+req.body.geezersName+". Wants to talk about: "+req.body.geezersSubject,
            html: "<p>" + req.body.geezersDescription + "<p/><p>Email: "+req.body.geezersEmail+"</p>"
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
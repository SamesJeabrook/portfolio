require('dotenv').config({path: __dirname+'/.env'});
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
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS
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
    const MeEmailTemplate = '<!DOCTYPE html>'+
                            '<html lang="en">'+
                            '<head>'+
                                '<meta charset="UTF-8">'+
                                '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
                                '<meta http-equiv="X-UA-Compatible" content="ie=edge">'+
                                '<title>'+req.body.geezersSubject+'</title>'+
                            '</head>'+
                            '<style>body{background:#ededed; padding: 100px}table{width:500px;margin:auto;background:#fff;text-align:center}h1{font-weight:200}td{padding:10px;}</style>'+
                            '<body style="background:#ededed; padding: 100px; font-family: Arial, Helvetica, sans-serif;">'+
                                '<table style="width:500px;margin:auto;background:#fff;text-align:center">'+
                                    '<tr>'+
                                        '<td style="padding:10px;"><h1 style="font-weight:200">Subject title: '+req.body.geezersSubject+'</h1></td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td style="padding:10px;"><p>Email from: '+req.body.geezersName+', email: '+req.body.geezersEmail+'</p></td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td style="padding:10px;"><p>'+req.body.geezersDescription+'</p></td>'+
                                    '</tr>'+
                                '</table>'+
                            '</body>'+
                            '</html>';

    const ThemEmailTemplate = '<!DOCTYPE html>'+
                                '<html lang="en">'+
                                '<head>'+
                                    '<meta charset="UTF-8">'+
                                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
                                    '<meta http-equiv="X-UA-Compatible" content="ie=edge">'+
                                    '<title>Thanks for getting in touch</title>'+
                                '</head>'+
                                '<style>body{background:#ededed; padding: 100px}table{width:500px;margin:auto;background:#fff;text-align:center}h1{font-weight:200}td{padding:10px;}a{color:#ff75f8;}</style>'+
                                '<body style="background: #ededed; padding: 10px; font-family: Arial, Helvetica, sans-serif;">'+
                                    '<table style="width:500px;margin:auto;background:#fff;text-align:center">'+
                                        '<tr>'+
                                            '<td style="padding:10px;"><h1>Thanks '+req.body.geezersName+' for getting in touch.</h1></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td style="padding:10px;"><p>I\'ll be in touch soon and we can talk more about '+req.body.geezersSubject+'</p></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td style="padding:10px;"><p>In the meantime you can view some of <a href="http://jamesseabrook.com/projects" style="color:#ff75f8;">my projects</a> on my portfolio to get some inspiration</p></td>'+
                                        '</tr>'+
                                    '</table>'+
                                '</body>'+
                                '</html>';
    if(req.body){
        const meEmailOptions = {
            from: "its-me@jamesseabrook.com",
            to: "its-me@jamesseabrook.com",
            subject: "Message from "+req.body.geezersName+". Wants to talk about: "+req.body.geezersSubject,
            html: MeEmailTemplate
        }

        const themEmailOptions = {
            from: "its-me@jamesseabrook.com",
            to: req.body.geezersEmail,
            subject: "Thanks for getting in touch over at jamesseabrook.com",
            html: ThemEmailTemplate
        }

        transporter.sendMail(meEmailOptions, function(error, info){
            if(error){
                res.status(400);
                res.json({"status": "fail", "message": "Failed to send email"});
                console.log(error);
            }else{
                res.status(200);
                res.json({"status": "success", "message": "Message sent"});
                console.log("Email sent: "+info.response);
                transporter.sendMail(themEmailOptions, function(error, info){
                    if(error){
                        console.log("Email to sender fail: ",error);
                    }else{
                        console.log("Email to sender sent: "+info.response);
                    }
                });
            }
        });

    }else{
        res.status(500)
        res.json({"status": "fail", "message": "No fields for sending"})
    }
})

module.exports = router;
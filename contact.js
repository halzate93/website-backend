/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');
var mailgun = require('nodemailer-mailgun-transport');

var transport = nodemailer.createTransport(
        mailgun({
            auth: {
                api_key: '',
                domain: ''
            }
        })
    );

exports.sendMail = function(req, res) {
    var fullName = req.body.name + " " + req.body.surname;

    var mailOptions = {
        from: fullName + " <" + req.body.email + ">",
        to: '',
        subject: "Contact from website",
        text: req.body.message + '\n' + req.body.phone,
        html: '<p>' + req.body.message + '</p>' +
                '<p>' + req.body.phone + '</p>'
    };

    transport.sendMail(mailOptions, function(error, info) {
        var result = {};

        if (error) {
            result['type'] = "Error";
            result['message'] = "Couldn't send the mail request, please send it to halzate93@gmail.com";
            console.log(error);
        }else{
            result['type'] = "Success";
            result['message'] = "Thanks!, I'll get back to you soon.";
            console.log('Message sent: ' + info.message);
        }

        res.json(result);
    });
};

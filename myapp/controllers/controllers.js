var mongoose = require('mongoose');
var userModel = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var request = require('request');


require('dotenv').config();


function storeToken(token) {
    process.env.TOKEN = token;
}

module.exports = {
    signIn: function (req, res, next) {

        if (req.method === 'GET') {
            res.render('signIn');
        }

        else if (req.method === 'POST') {

            userModel.findOne({ email: req.body.email }, (err, result) => {

                if (result === null) {

                    console.log("Authentication Failed DATA NOT FOUND");
                }
                else {

                    bcrypt.compare(req.body.password, result.password).then(function (passwordAuthorization) {
                        if (passwordAuthorization) {
                            if (req.body.email === result.email) {
                                console.log("Authentication Success");

                                jwt.sign({ userId: result._id }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {
                                    storeToken(token);
                                    res.json({ success: true, isAdmin: result.isAdmin });
                                });
                                request.post("http://localhost:3000/home");
                            }
                        }
                        else {
                            res.json({ success: false, isAdmin: result.isAdmin });
                            console.log("Authentication failed");
                        }
                    });
                }
            });
        }

    },
    signUp: function (req, res, next) {

        if (req.method === 'GET') {

            res.render('signUp');

        }

        else if (req.method === 'POST') {
            var user = new userModel({
                //  userId: new mongoose.Types.ObjectId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                isAdmin: false
            });

            bcrypt.hash(req.body.password, 4)
                .then((hash) => {
                    if (hash) {

                        return hash;
                    }
                    else {
                        console.log("hash not stored")
                    }
                })

                .then((response) => {

                    user.password = response;
                })

                .then(() => {
                    user.save();
                    res.json({ success: true })
                })

                .catch((error) => {
                    console.log(error);
                })
        }

    },

    home: (req, res, next) => {
        if (req.method === 'GET') {
            res.render('home');
        }
        else if (req.method === 'POST') {
            res.render('home');
        }
    },

    homeAdmin: (req, res, next) => {
        if (req.method === 'GET') {
            res.render('homeAdmin');
        }
        else if (req.method === 'POST') {
            res.render('homeAdmin');
        }
    },

    userProfile: (req, res, next) => {
        if (req.method === 'GET') {

            res.render('userProfile');


        }
        else if (req.method === 'POST') {
            // console.log("token=====>",process.env.TOKEN);
            jwt.verify(process.env.TOKEN, process.env.SECRETKEY, (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                else {
                    userModel.findOne({ _id: decoded.userId }, (err, result) => {

                        if (result === null) {

                            console.log("Authentication Failed DATA NOT FOUND");
                        }
                        else {
                            res.json(result);
                        }
                    });
                }
            });
        }
    },

    userUpdate: (req, res, next) => {

        if (req.method === 'GET') {
            res.render('updateUser');
        }
        else if (req.method === 'POST') {
            //res.render('homeAdmin');
            jwt.verify(process.env.TOKEN, process.env.SECRETKEY, (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                else {
                    userModel.findOne({ _id: decoded.userId }, (err, result) => {

                        if (result === null) {

                            console.log("Authentication Failed DATA NOT FOUND");
                        }
                        else {
                            res.json(result);
                        }
                    });
                }
            });
        }
    },
    updateUserinDb : (req,res,next) => {
        if (req.method === 'GET') {
            res.render('updateUser');
        }
        else if (req.method === 'POST') {
       
            userModel.findOneAndUpdate({_id:req.body.userId}, { firstName:req.body.userFirstName,
            lastName: req.body.userLastName }, (err,doc)=>{
                if(err) {
                   console.log(err)
                    res.json({success:false});
                }
                else {
                    console.log(doc);
                    res.json({success:true})
                }
            });

        }
    },

    allUser : (req,res,next) => {
        if (req.method === 'GET') {
            res.render('allUser');
        }
        else if (req.method === 'POST') {
           
        }
    }
}
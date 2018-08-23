var mongoose = require('mongoose');
var userModel = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
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
                    //   res.json({success: false , data : "Authentication Failed"});
                    //res.write("Authentication Failed");   
                    console.log("Authentication Failed DATA NOT FOUND");
                }
                else {

                    bcrypt.compare(req.body.password, result.password).then(function (passwordAuthorization) {
                        if (passwordAuthorization) {
                            if (req.body.email === result.email) {
                                console.log("Authentication Success");

                                jwt.sign({ userId: result._id }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {
                                    storeToken(token);
                                });

                                $.ajax({
                                    url: "http://localhost:3000/home",
                                    method: "GET"

                                })
                            }

                        }
                        else {

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
                email: req.body.email
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
                })

                .catch((error) => {
                    console.log(error);
                })
        }

    },

    home: (req, res, next) => {
        if (req.method === 'GET') {
            console.log("getrequset");
        }
        else if (req.method === 'POST') {

        }
    }

}
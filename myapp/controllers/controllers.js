var mongoose = require('mongoose');
var userModel = require('../models/user');
var userActivityModel = require('../models/userActivity');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var request = require('request');
var moment = require('moment');


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

                    res.boom.unauthorized();
                }
                else {

                    bcrypt.compare(req.body.password, result.password).then(function (passwordAuthorization) {
                        if (passwordAuthorization) {
                            if (req.body.email === result.email) {
                                console.log("Authentication Success");


                                    userActivityModel.findOne({userName:req.body.email},(err,person)=>{
                                            if(err) {
                                                console.log("====>err",err) 
                                            } 
                                            else if(person===null){

                                                var userActivity = new userActivityModel({
                                                    userId: result._id,
                                                    userName:result.email,
                                                    timeStamp: moment().format('x')
                                                });
                
                                                userActivity.save();                                                
                                            }
                                            
                                            else if(person) {
                                                
                                                var currentTime = moment().format('x')
                                                userActivityModel.findOneAndUpdate({userName:result.email},{timeStamp: currentTime});
                                            }
                                    })                                



                                jwt.sign({ userId: result._id }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {
                                    storeToken(token);
                                    res.json({ success: true, 
                                        isAdmin: result.isAdmin, 
                                        authorization: token,
                                    });
                                });
                                request.post("http://localhost:3000/home");
                               
                               
                            }
                        }
                        else {
                            res.json({ success: false, isAdmin: result.isAdmin });
                            res.boom.unauthorized();
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
                 _id:new mongoose.Types.ObjectId(),
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
      console.log("==>in homeadminpost")

            var currentTime =moment().format('x');
            userActivityModel.find({})
            .then((users)=>{
                var userLoggedIn = [];
                users.forEach(user => {
                  
                    // if(moment.duration(currentTime-user.timeStamp).asSeconds() > 200 ){
                        
                    //     userLoggedIn.push(user);
                    // }

                    var updatedUser = {
                        userName : user.userName,
                        timeStamp : moment.duration(currentTime-user.timeStamp).asSeconds()                        
                    }
                    userLoggedIn.push(updatedUser);


                });
                console.log("outside===>",userLoggedIn);
                  ;res.json({userData:userLoggedIn})  
        }).catch((err)=>{
            console.log(err);
        })
    }
    },

    userProfile: (req, res, next) => {
        if (req.method === 'GET') {

            res.render('userProfile');


        }
        else if (req.method === 'POST') {
           
            console.log("=====> from authentication" , req.body.userId);
                    userModel.findOne({ _id: req.body.userId }, (err, result) => {

                        if (result === null) {

                            console.log("Authentication Failed DATA NOT FOUND");
                        }
                        else {
                            res.json(result);
                        }
                    });
                }
              
    },

    userProfileAdmin: (req, res, next) => {
        if (req.method === 'GET') {

            res.render('userProfileAdmin');


        }
        else if (req.method === 'POST') {
            // console.log("token=====>",process.env.TOKEN);
                  userModel.findOne({ _id: req.body.userId }, (err, result) => {

                        if (result === null) {

                            console.log("Authentication Failed DATA NOT FOUND");
                        }
                        else {
                            res.json(result);
                        }
                    });
                
        }
    },


    userUpdate: (req, res, next) => {

        if (req.method === 'GET') {
            res.render('updateUser');
        }
        else if (req.method === 'POST') {
            userModel.findOne({ _id: req.body.userId }, (err, result) => {

                if (result === null) {

                    console.log("Authentication Failed DATA NOT FOUND");
                }
                else {
                    res.json(result);
                }
            });
        }
    },

    userUpdateAdmin: (req, res, next) => {

        if (req.method === 'GET') {
            console.log("====>admin update");
            res.render('updateUserAdmin');
        }
        else if (req.method === 'POST') {
            //res.render('homeAdmin');
            userModel.findOne({ _id: req.body.userId }, (err, result) => {

                if (result === null) {

                    console.log("Authentication Failed DATA NOT FOUND");
                }
                else {
                    res.json(result);
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
           userModel.find({},(err,usersData) => {
               if(err) {
                   console.log(err)
                   res.json({success:false})
               }
               else {
                   
                   res.json({success:true,users:usersData});
               }
           })
        }
    },
    searchUser: (req, res, next) => {
        if (req.method === 'GET') {
            res.render('searchUser');
           
        }
        else if (req.method === 'POST') {
            userModel.findOne({email :req.body.email }, (err, result) => {

                if (result === null) {
                    //res.boom.unauthorized("User Not present");
                    res.json(result);
                    
                }
                else {
                    res.json(result);
                }
            });
        }
    }, 
}
import mongoose from 'mongoose';
import userModel from '../models/user';
import userActivityModel from '../models/userActivity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import useragent from 'express-useragent';
import {ioInstance} from '../bin/www'


const requestIp = require('request-ip');

require('dotenv').config();

class Controllers {
    signIn(req, res, next) {

        if(req.body.email.length<1){
                
            res.json({success: false});
        }

        if(req.body.email.length<1){
            res.json({success: false});
        }
        
        userModel.findOne({ email: req.body.email }, (err, result) => {

            if (result === null) {

                res.boom.unauthorized();
            }
            else {

                bcrypt.compare(req.body.password, result.password).then(function (passwordAuthorization) {
                    if (passwordAuthorization) {
                        if (req.body.email === result.email) {
                            console.log("Authentication Success");

                            let source = req.headers['user-agent'],
                                ua = useragent.parse(source);

                            let clientIp = requestIp.getClientIp(req);

                            userActivityModel.findOne({ userName: req.body.email }, (err, person) => {
                                if (err) {
                                    res.json(boom.notFound('User Not Found'));
                                }
                                else if (person === null) {
                                    const userActivity = new userActivityModel({
                                        userId: result._id,
                                        userName: result.email,
                                        UA: ua.source,
                                        IP: clientIp,
                                        timeStamp: moment().format('x'),
                                    });

                                    userActivity.save();
                                }

                                else if (person != null) {
                                    
                                    let currentTime = moment().format('x');
                                    userActivityModel.findOneAndUpdate({ userName: result.email }, { timeStamp: currentTime }, { new: true } ,(err, result) => {
                                        
                                    } );
                                }
                            });

                            jwt.sign({ userId: result._id }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {

                                res.json({
                                    success: true,
                                    isAdmin: result.isAdmin,
                                    authorization: token,
                                });
                            });
                        
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

    signUp(req, res, next) {

        const user = new userModel({
            _id: new mongoose.Types.ObjectId(),
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
                res.json({ success: false })

            })
    }

    home(req, res, next) {

        res.render('home');
    }

    homeAdmin(req, res, next) {

        let currentTime = moment().format('x');
        userActivityModel.find({})
            .then((users) => {
                let userLoggedIn = [];
                users.forEach(user => {

                    if (moment.duration(currentTime - user.timeStamp).asSeconds() > 432000) {

                        userLoggedIn.push(user);
                    }
                });

                res.json({ userData: userLoggedIn });

            }).catch((err) => {
                console.log(err);
            })
    }

    getUserDetails(req, res, next) {

        ioInstance.of('/homeadmin')
        .on('connection', function (socket) {
          console.log("connected2");
          socket.emit('news', { hello: 'Shantanu Gadeadmin' });
          
          });
        

        // ioInstance.on('connection', function (socket) {
        //     console.log("connected");
        //     socket.emit('news', { hello: 'Shantanu Gade' });
        //     socket.on('my other event', function (data) {
        //     console.log(data);
        //     });
        //     });
            
        
        userModel.findOne({ _id: req.body.userId }, (err, result) => {

            if (result === null) {

                res.json(boom.notFound("User Not Found"));
            }
            else {
                res.json(result);
            }
        });
    }

    updateUser(req, res, next) {

        userModel.findOneAndUpdate({ _id: req.body.userId }, {
            firstName: req.body.userFirstName, lastName: req.body.userLastName
        }, (err, doc) => {
            if (err) {

                res.json({ success: false });
            }
            else {

                res.json({ success: true });
            }
        });
    }

    allUser(req, res, next) {

        userModel.find({}, (err, usersData) => {
            if (err) {

                res.json({ success: false });
            }
            else {

                res.json({ success: true, users: usersData });
            }
        })
    }

    searchUser(req, res, next) {

        userModel.findOne({ email: req.body.email }, (err, result) => {

            if (result === null) {

                res.json(boom.unauthorized("User Not present"));

            }
            else {
                res.json(result);
            }
        });
    }
}

export default new Controllers();
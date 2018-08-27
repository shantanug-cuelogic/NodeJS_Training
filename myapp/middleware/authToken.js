var mongoose = require('mongoose');
var userModel = require('../models/user');
var userActivityModel = require('../models/userActivity');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

require('dotenv').config();

class authToken {

    authenticateToken(req, res, next) {
        console.log("===>inclass")
        if (req.method === "GET") {
            next();
        }

        else if (req.method === "POST") {
            jwt.verify(req.body.userToken, process.env.SECRETKEY, (err, decoded) => {
                if (err) {

                    res.boom.unauthorized(err)
                }
                else {
                    userModel.findOne({ _id: decoded.userId }, (err, result) => {

                        if (result === null) {

                            console.log("Authentication Failed DATA NOT FOUND");
                            res.boom.unauthorized()
                        }
                        else {
                            req.body.userId = decoded.userId;
                            next();
                        }
                    });
                }
            });
        }

    }

}
module.exports = new authToken(); 
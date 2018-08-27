var controllers = require('../controllers/controllers');
var authToken = require('../middleware/authToken');
var validate = require('../middleware/validation');
var express = require('express');
var router = express.Router();

    router.use('/signup',validate.validateUserData ,controllers.signUp );
    router.use('/signin', controllers.signIn );
    router.use('/home', controllers.home );
    router.use('/homeadmin', controllers.homeAdmin );
    router.use('/userprofile',authToken.authenticateToken,controllers.userProfile);
    router.use('/updateuser',authToken.authenticateToken, controllers.userUpdate);
    router.use('/userprofileadmin',authToken.authenticateToken, controllers.userProfileAdmin);
    router.use('/updateuseradmin',authToken.authenticateToken, controllers.userUpdateAdmin);
    router.use('/updateUserinProgress',controllers.updateUserinDb);
    router.use('/alluser',controllers.allUser);
    router.use('/searchuser',controllers.searchUser)

module.exports = router;

import express from 'express';
const router = express.Router();
import authToken from '../middleware/authToken';
import validate from '../middleware/validation';
import controllers from '../controllers/controllers';

router.get('/', (req, res, next) => { res.render('signUp') });
router.get('/signup', (req, res, next) => { res.render('signUp') });
router.post('/signup', validate.validateUserData, controllers.signUp);
router.get('/signin', (req, res, next) => { res.render('signIn') });
router.post('/signin', validate.validateUserData, controllers.signIn);
router.get('/home', (req, res, next) => { res.render('home') });
router.post('/home', (req, res, next) => { res.render('home') });
router.get('/homeadmin', (req, res, next) => { res.render('homeAdmin'); });
router.post('/homeadmin', controllers.homeAdmin);
router.get('/userprofile', (req, res, next) => { res.render('userProfile') });
router.post('/userprofile', authToken.authenticateToken, controllers.getUserDetails);
router.post('/updateuser', authToken.authenticateToken, controllers.getUserDetails);
router.get('/updateuser', (req, res, next) => { res.render('updateUser'); });
router.put('/storeuser', controllers.updateUser);
router.get('/userprofileadmin', (req, res, next) => { res.render('userProfileAdmin') });
router.post('/userprofileadmin', authToken.authenticateToken, controllers.getUserDetails);
router.get('/updateuseradmin', (req, res, next) => { res.render('updateUserAdmin'); });
router.get('/alluser', (req, res, next) => { res.render('allUser') });
router.post('/alluser', controllers.allUser);
router.get('/searchuser', (req, res, next) => { res.render('searchUser') });
router.post('/searchuser', authToken.authenticateToken, controllers.searchUser);


module.exports = router;

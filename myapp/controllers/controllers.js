var userModel= require('../models/user');
var bcrypt = require('bcrypt');

function hashGenarator (pass){
    bcrypt.hash(req.body.password, saltRounds)
    .then(function(res){
       return res;
    })   
}


module.exports = {
    signIn: function (req, res, next) {

        if (req.method === 'GET') {
            res.render('signIn');
        }

        else if (req.method === 'POST') {
            res.send(req.body.firstName);
        }

    },
    signUp: function (req, res, next) {
        
        if(req.method === 'GET') {
            res.render('signUp');
        }

        else if(req.method === 'POST') {
            
            //var password = hashGenarator(req.body.password);              
            var user = new userModel({
              //  userId: new mongoose.Types.ObjectId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                password : password
            });
            

            console.log(user);
            user.save();
        }
        
    },

}
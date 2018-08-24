var mongoose = require('mongoose');


var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/NodeJSAppData', { useNewUrlParser: true });

var userSchema = new Schema({
    //"userId":  Schema.Types.ObjectId,
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "isAdmin": Boolean
});

var user = mongoose.model('user', userSchema);
module.exports = user;
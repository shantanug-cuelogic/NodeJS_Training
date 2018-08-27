var mongoose = require('mongoose');


var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/NodeJSAppData', { useNewUrlParser: true });

var userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: {type:String},
    password: String,
    isAdmin: Boolean
});

var user = mongoose.model('user', userSchema);
module.exports = user;
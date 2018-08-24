var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NodeJSAppData',{useNewUrlParser:true});
var Schema = mongoose.Schema;

var userActivitySchema = new Schema({
    "userId":  String,
    "userName": String,
    "timeStamp": String
});

var userActivity = mongoose.model('userActivity', userActivitySchema);
module.exports = userActivity;
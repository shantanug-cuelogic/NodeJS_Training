import mongoose from 'mongoose';

let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/NodeJSAppData', { useNewUrlParser: true });

const userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: {type:String},
    password: String,
    isAdmin: Boolean
});

const user = mongoose.model('user', userSchema);
module.exports = user;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongoose_basics',{useNewUrlParser:true});

var employeeSchema = new Schema({
    empId: Number,
    firstName: String,
    lastName: String,
    Salary: Number,   
});

var empData = mongoose.model('empData', employeeSchema);

var emp = new empData({
    empId: 1,
    firstName: "Shantanu",
    lastName: "Gade",
    Salary: 1555555, 
});


emp.save();
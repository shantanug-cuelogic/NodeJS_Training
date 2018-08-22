var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var Schema = mongoose.Schema;
var app = express()

mongoose.connect('mongodb://localhost:27017/mongoose_basics',{useNewUrlParser:true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'))

var employeeSchema = new Schema({
    empId: String,
    firstName: String,
    lastName: String,
    age: { type: Number, min: 18, max: 65 },   
});

employeeSchema.index({"empId": 1});

var empData = mongoose.model('empData', employeeSchema);


var createData = (req,res,next) =>{
        
    var employee = new empData({
        empId: req.body.empid,
        firstName: req.body.fname,
        lastName: req.body.lname,
        age: req.body.age, 
    });
    
    employee.save(function(err,data) { 

        if(err) {
            throw err;
        }

        res.send("Inserted" +data);

    });
    
  
    
}

var showDeletePage = (req,res,next) => {

    res.sendFile(path.join(__dirname+'/public'+'/delete.html'));
  
}

var deleteEmployee = (req,res,next) => {

    empData.findOneAndRemove({empId:req.body.empid}, function(err, employee) {
        res.send("Deleted" + employee);
    });
   
}

var getAllEmployee = (req,res,next) => {
    empData.find({},function(err,employees){
     res.send(employees);
    });
}

var showUpdatePage = (req,res,next) => {
    res.sendFile(path.join(__dirname+'/public'+'/update.html'));


}
showEmployeeDetails = (req,res,next) => {
    
    empData.findOne({empId:req.body.empid},function(err,employee){
       var response = `<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <meta http-equiv="X-UA-Compatible" content="ie=edge">
           <title>Mongoose Assignment</title>
           <!-- Latest compiled and minified CSS -->
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
       
       <!-- jQuery library -->
       <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
       
       <!-- Latest compiled JavaScript -->
       <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
       </head>
       <body>
           <div class="container">
               <div class="jumbotron">
                 <h1>Mongoose Assignment</h1> 
               </div>
               <div class="col-sm-4 col-sm-offset-4 ">
               <form method="POST" action="updateEmployeeTwo" >
                   <div class="form-group">
                     <label for="fname">First Name:</label>
                     <input type="text" class="form-control" value=${employee.firstName} name="fname">
                   </div>
                   <div class="form-group">
                       <label for="lname">Last Name:</label>
                       <input type="text" class="form-control" value=${employee.lastName} name="lname">
                     </div>
                     <div class="form-group">
                       <label for="empid">EmployeeID:</label>
                       <input type="text" class="form-control" value=${employee.empId} name="empid">
                     </div>
                   <div class="form-group">
                     <label for="age">Age</label>
                     <input type="number" class="form-control" name="age" value=${employee.age} ">
                   </div>
                   
                   <button type="submit" class="btn btn-danger">Submit</button>
                 </form>
               </div>
       
             </div>
       
       </body>
       </html>`
       
        res.write(response);
        res.end();
    });
    
}

var updateEmployee = (req,res,next) => {
    var query = {empId: req.body.empid};  
    var updateData = {
        empId: req.body.empid,
        firstName: req.body.fname,
        lastName: req.body.lname,
        age: req.body.age,
    }  
    
    empData.findOneAndUpdate(query,updateData, function(err,data) {
        if(err) { throw err }

        res.send("Updated Data" + data);
        
    })
}

app.get('/',createData);
app.post('/',createData);
app.get('/deleteEmployee',showDeletePage);
app.post('/deleteEmployee',deleteEmployee);
app.get('/getAllEmployee', getAllEmployee);
app.get('/updateEmployee',showUpdatePage);
app.post('/updateEmployeeOne',showEmployeeDetails);
app.post('/updateEmployeeTwo',updateEmployee);
app.get('/updateEmployeeTwo',showUpdatePage);




app.listen(3000);

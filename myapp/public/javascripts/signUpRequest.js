
signUp = (event) => {
    
    event.preventDefault();
    var email = $('#email').val();
    var firstName = $('#fname').val();
    var lastName = $('#lname').val();
    var password = $('#pwd').val();
   
    $.ajax({
        url: "http://localhost:3000/signup",
        method: "POST",
        data: {
            email : email,
            firstName: firstName,
            lastName: lastName,
            password: password
        },
   success:(result) => {
       if(result.success) {
           alert("Succesfully Registered");
           window.location.replace('/signin');
       }
        else {
            alert("Please fill all the details carefully");
            window.location.replace('/signup');            
        }
   }      
    });
   
}
$(document).ready(function(){


showUserAdmin = () => {

    $.ajax({
        url: "http://localhost:3000/userprofileadmin",
        method: "POST",
        data: {
            userToken:localStorage.getItem('token')
        },
        success: (result) => {

                              
           document.getElementById('fname').innerHTML= result.firstName +" "+ result.lastName
           document.getElementById('email').innerHTML= result.email;
            
        } ,
    
    });
   
}
});
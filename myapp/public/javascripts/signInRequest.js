
signIn = (event) => {
    
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#pwd').val();
   
    $.ajax({
        url: "http://localhost:3000/signin",
        method: "POST",
        data: {
            email : email,
            password: password
        },
        success: (result) => {
            console.log("====>",result.success);
           
        if(result.success && result.isAdmin){
            window.location.replace('/homeadmin');
        }
        else if(result.success && !result.isAdmin) {
            window.location.replace('/home');            
        }
            
        } ,
    
    });
   
}
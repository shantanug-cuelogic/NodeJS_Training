showUser = () => {

    $.ajax({
        url: "http://localhost:3000/userprofile",
        method: "POST",
        data: {
            userToken:localStorage.getItem('token')
        },
        success: (result) => {

           document.getElementById('fname').innerHTML= result.firstName +" "+ result.lastName
           document.getElementById('email').innerHTML= result.email;
                     
           $(".card").fadeIn();
           $("#fname").fadeIn("slow");
           $("#email").fadeIn(30000);
    

            
        } ,
    
    });
   
}
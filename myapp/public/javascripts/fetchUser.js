showUser = () => {

    $.ajax({
        url: "http://localhost:3000/userprofile",
        method: "POST",
        data: {
            
        },
        success: (result) => {

            console.log("======>",result.firstName);
            //document.write("user.png");
        //    document.getElementById('userImg').src = "./user.png";
           document.getElementById('fname').innerHTML= result.firstName +" "+ result.lastName
           document.getElementById('email').innerHTML= result.email;
         
            
        } ,
    
    });
   
}
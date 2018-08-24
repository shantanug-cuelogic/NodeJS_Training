searchUser =() => {
  
    $.ajax({
        url: "http://localhost:3000/searchuser",
        method: "POST",
        data: {
            email : document.getElementById('email').value,
            
        },
        success: (result) => {
            console.log("====>in frontensadd",result.email);
            if(result===null) {
                console.log("error");
            }

            else {

                document.getElementById('fname').innerHTML= result.firstName +" "+ result.lastName;
              
                document.getElementById('emailtext').innerHTML= result.email;


            }
        } ,
    
    });
   
}


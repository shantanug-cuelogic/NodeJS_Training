var userObject ;
getUser = () => {
    
    $.ajax({
        url: "http://localhost:3000/updateUser",
        method: "POST",
        data: {
            userToken:localStorage.getItem('token')
        },
        success: (result) => {

          
            document.getElementById('email').innerHTML = result.email;
            document.getElementById('fname').value = result.firstName;
            document.getElementById('lname').value = result.lastName
          userObject=result;

        },

    });
}

updateUser = () => {
    
    $.ajax({
        url: "http://localhost:3000/storeuser",
        method:"PUT",
        data: {
            userToken:localStorage.getItem('token'),
           userId: userObject._id,
           userFirstName : document.getElementById('fname').value,
           userLastName : document.getElementById('lname').value,
           
},
        success: (result) => {
            if(result.success) {
                alert("Update");

            }
            else {
                alert("Error occured");
            }

        },

    });
 
}
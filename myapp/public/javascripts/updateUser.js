var userObject ;
updateUser = () => {
    $.ajax({
        url: "http://localhost:3000/updateUser",
        method: "POST",
        data: {
            userToken:localStorage.getItem('token')
        },
        success: (result) => {

            console.log("updateuser======>", result.firstName);
            document.getElementById('email').innerHTML = result.email;
            document.getElementById('fname').value = result.firstName;
            document.getElementById('lname').value = result.lastName
          userObject=result;

        },

    });
}

editable = () => {
    console.log("edituser======>", userObject.firstName);
    $.ajax({
        url: "http://localhost:3000/updateUserinProgress",
        method: "POST",
        data: {
           
           userId: userObject._id,
           userFirstName : document.getElementById('fname').value,
           userLastName : document.getElementById('lname').value

           
        },
        // success: (result) => {

        //     console.log("updateuser======>", result.firstName);
        //     document.getElementById('email').innerHTML = result.email;
        //     document.getElementById('fname').value = result.firstName;
        //     document.getElementById('lname').value = result.lastName
          

        // },

    });
 
}
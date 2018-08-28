
signIn = (event) => {


    var socket = io.connect('http://localhost:3000/signin');
    socket.on('news', function (data) {
    alert(data.hello);
    socket.emit('my other event', { my: 'data' });
    });


    event.preventDefault();
    var email = $('#email').val();
    var password = $('#pwd').val();

    if(email.length<1 && password.length<1 )    {
        
    confirm("all fields are compulsory");
    }
    else {
        
    $.ajax({
        url: "http://localhost:3000/signin",
        method: "POST",
        data: {

            email: email,
            password: password
        },
        success: (result) => {

            console.log(result);

            if (result.success) {
              
                localStorage.setItem("token", result.authorization);

                if (result.success && result.isAdmin) {
                    window.location.replace('/homeadmin');
                }
                else if (result.success && !result.isAdmin) {
                    window.location.replace('/home');
                }
            }
            else {
                alert("Authentication Failed");
            }
        },

    });
    }


}
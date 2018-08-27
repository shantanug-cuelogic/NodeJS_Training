userNotLoggedIn = () => {
    var socket = io.connect('http://localhost:3000/homeadmin');
    socket.on('welcome', function(data) {
        alert(data);
    });


    $.ajax({
        url: "http://localhost:3000/homeadmin",
        method: "POST",
        data: {
            userToken: localStorage.getItem('token')
        },
        success: (result) => {


            for (append = 0; append < result.userData.length; append++) {

                var x = document.createElement("TR");
                x.setAttribute("id", "listtr" + append);
                document.getElementById("listtable").appendChild(x);

                var s = document.createElement("TD");
                var t = document.createTextNode(append + 1);
                s.appendChild(t);
                document.getElementById("listtr" + append).appendChild(s);

                var c = document.createElement("TD");
                var d = document.createTextNode(result.userData[append].userName);
                c.appendChild(d);
                document.getElementById("listtr" + append).appendChild(c);

                var e = document.createElement("TD");
                var f = document.createTextNode(result.userData[append].timeStamp);
                e.appendChild(f);
                document.getElementById("listtr" + append).appendChild(e);

                // var g = document.createElement("TD");
                // var h = document.createTextNode(result.users[append].email);
                // g.appendChild(h);
                // document.getElementById("listtr" + append).appendChild(g);




            }
        }

    });
}
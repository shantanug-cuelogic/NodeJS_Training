userNotLoggedIn = () => {

    var socket = io.connect('http://localhost:3000/homeadmin');
    socket.on('news', function (data) {
    alert(data.hello);
    socket.emit('my other event', { my: 'data' });
    });


    $.ajax({
        url: "http://localhost:3000/homeadmin",
        method: "POST",
        data: {
            userToken: localStorage.getItem('token')
        },
        success: (result) => {


            for (append = 0; append < result.userData.length; append++) {

                let x = document.createElement("TR");
                x.setAttribute("id", "listtr" + append);
                document.getElementById("listtable").appendChild(x);

                let s = document.createElement("TD");
                let t = document.createTextNode(append + 1);
                s.appendChild(t);
                document.getElementById("listtr" + append).appendChild(s);

                let c = document.createElement("TD");
                let d = document.createTextNode(result.userData[append].userName);
                c.appendChild(d);
                document.getElementById("listtr" + append).appendChild(c);

                let e = document.createElement("TD");
                let f = document.createTextNode(result.userData[append].timeStamp);
                e.appendChild(f);
                document.getElementById("listtr" + append).appendChild(e);

            }
        }

    });
}
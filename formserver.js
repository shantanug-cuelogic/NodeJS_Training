var http = require("http");
var fs= require('fs');
require('dotenv').config();

http.createServer(function(req,res){

    if (req.method==="GET") {
        res.writeHead(200,{"Content-Type" : "text/html"});
        fs.createReadStream("./public/form.html", "UTF-8").pipe(res);
    
    } else if (req.method==="POST") {
        var body = "";
        req.on("data",function(chunk){
            body+=chunk;
        });
        

        req.on("end",function() {
            res.writeHead(200,{"Content-Type" : "text/html"});
            res.end(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Submitting post data</title>
                    </head>
                    <body>
                        <h1>Form result</h1>
                        <p>${body}</p>
                    </body>
                </html>
            `);
        });
    }
}).listen(process.env.PORT);

console.log(`Server is running on port ${process.env.PORT}`);

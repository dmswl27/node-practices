const http = require('http');
const fs = require('fs');

const port = 8888;
const server = http.createServer(function(req, resp){
    console.log(req.url);
    if(req.url === '/'){
        req.url = '/index.html';
    } 

    fs.readFile(__dirname + "/public" + req.url, function(error, data){
        resp.writeHead(200, {
            'Content-Type': 'text/html'        
        });
        resp.end(data);
    });
});

server.listen(port, function(){
    console.log(`Http Server running on port ${port}`);
})

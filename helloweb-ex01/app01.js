const http = require('http');

const port = 8888;
const server = http.createServer(function(req, resp) {
    console.log("request!");
});

server.listen(port, function() {
    console.log('Http Server running on port ${port}');
});
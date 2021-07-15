const connect = require('connect');
const serveStatic = require('serve-static');

const port = 8888;
const app =connect();
app.use(serveStatic(__dirname + '/public'));  // __dirname은 현재 실행하는 파일의 절대경로이다.
app.listen(port, function() {
    console.log('Http Server running on port ${port}');
});
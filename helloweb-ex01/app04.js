const connect = require('connect');
const serveStatic = require('serve-static');
const connectRoute = require('connect-route'); // 어플리케이션과 연결
 
const port = 8888;
const app = connect();
app.use(serveStatic(__dirname + '/public'));  // __dirname은 현재 실행하는 파일의 절대경로이다.
app.use(connectRoute(function(router){
    router.get('/', function(req, res){
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>main</h1>");
    });
    router.get('/user', function(req, res) {
        // console.log(req._parsedUrl.query); // no=12
        console.log(req);
        req.query = {};
        params = (req._parsedUrl.query || "").split("&"); // queryString을 아무것도 안주면 null로 에러
        params.forEach(param => {
            tokens = param.split("=");
            req.query[tokens[0]] = tokens[1];
        });
 
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>user no"+ req.query.no+"</h1>");
    });
    router.get('/guestbook', function(req, res){
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>guestbook list</h1>");
    });

    router.get('/board/:no', function(req, res){
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>board view(" + req.params.no + ")</h1>"); //@PathVariable 값 추출방법
    });
}))
app.listen(port, function(){
    console.log(`HTTP Server running on port ${port}`);
});

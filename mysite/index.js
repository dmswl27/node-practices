const http = require('http');
const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');

// Enviroment Variables(환경변수)
dotenv.config({path: path.join(__dirname, 'config/app.env')});
dotenv.config({path: path.join(__dirname, 'config/db.env')});

const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const guestbookRouter = require('./routes/guestbook');

// Logging
const logger = require('./logging');

// Application Setup
const application = express()
    // 1. static serve 
    // 2. session enviroment
    .use(session({
        secret: 'mysite-session',  // 쿠키 변조를 방조 하기 위한 값
        resave: false,             // 요청 쿼리에서 세션의 변경사항이 없어도 항상 저장  
        saveUninitialized: false   // 새로 세션을 생성할 떄 "uninitialized" 상태로 뜬다. 따라서 로그인 세션에서는 false로 해두는게 좋다.
    })) 
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
    // 2. request body parser
    .use(express.urlencoded({extended: true})) // application/x-www-form-urlencoded
    .use(express.json())                       // application/json
    // 3. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // 4. request router
    .all('*', function(req, res, next) {
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    .use('/', mainRouter)
    .use('/user', userRouter)
    .use('/guestbook', guestbookRouter)
    .use((req,res) => res.render('error/404'));
    
// Server Setup    
http.createServer(application)
    .on('listening', function(){
        logger.info(`Http Server running on port ${process.env.port}`);
    })
    .on('error', function(error){
        if(error.syscall !== 'listen'){
            throw error;
        }
        switch(error.code){
            case 'EACCESS':
                logger.error(`Port:${process.env.port} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`Port:${process.env.port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;        
        }
    })
    .listen(process.env.port);
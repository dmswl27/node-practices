# MySite on Node(Express)

## project manifest 파일(package.json) 생성
$ npm init -y

## 설치패키지
```bash
$ npm i express
$ npm i ejs
$ npm i dotenv
$ npm i mysql2
$ npm i sequelize
$ npm i multer
$ npm i -D nodemon
$ npm i express-session
$ npm i moment
$ npm i winston  //logfile관리 
$ npm i winston-daily-rotate-file

```

## scripts in package.json
```JSON
.
.
.
  "scripts": {
    "start": "node index.js",
    "debug": "nodemon index.js"
  },
.
.
.  
```

## project structure
<pre>
/mysite
    |--- index.js
    |--- package.json
    |--- package-lock.json
    |--- /node-modules
    |--- /config
    |--- /logging
    |--- /logs
            | --- error
    |--- /multer-temporary-store
    |--- /public
            |--- /assets
                    |--- /gallery 
    |--- /routes
    |--- /controllers
    |--- /models
    |--- /views
            |--- /main
            |--- /user
            |--- /guestbook
            |--- /board
            |--- /gallery
            |--- /admin
</pre>
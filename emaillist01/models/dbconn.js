const mysql = require('mysql');

module.exports = function(){
    return mysql.createConnection({
        host: '192.168.254.36',
        port: 3307,
        user: 'webdb',
        password: 'webdb',
        database: 'webdb'
    });
}
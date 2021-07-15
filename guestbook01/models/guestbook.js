const mysql = require('mysql');
const { resolve } = require('path');
const util = require('util');

const dbconn = require('./dbconn');

module.exports = {
    findAll: async function() {
        const conn = dbconn();
        // const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, data, (error, results, field) => error ? reject(error):resolve(rows))); 
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                "select no, name, message, date_format(reg_date, '%Y/%m/%d %H:%i:%s') as regDate from guestbook order by no desc",
                []
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    insert: async function(guestbook) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                "insert into guestbook values(null, ?, ?, ?, now())",
                Object.values(guestbook)
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    delete: async function (guestbook) {
        const conn = dbconn();
        console.log(conn.body);
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                "delete from guestbook where no = ? and passward = ?" ,
                Object.values(guestbook)
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    }
}
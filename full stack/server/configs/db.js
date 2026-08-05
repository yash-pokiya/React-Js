const mysql2 = require("mysql2/promise");

const db =  mysql2.createPool({
        host : "localhost",
        user : "root",
        password : "Yashpokiya@01",
        database : "shop",
    })

module.exports = db;
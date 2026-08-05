const mysql2 = require("mysql2/promise");

const connection = mysql2.createPool({
    database: "quiz",
    user: "root",
    host: "localhost",
    password: [process.env.DB_PASSWORD]
})


module.exports = connection;

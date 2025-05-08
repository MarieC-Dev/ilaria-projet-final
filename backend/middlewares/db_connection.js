const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if(err) {
        console.log('Error connecting to Mysql :', err);
    }
    console.log('➡️  MySQL is connected successfully ✅');
});

module.exports = connection.promise();
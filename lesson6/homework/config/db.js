const mysql = require('mysql2/promise');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'learn'
};

const connection = mysql.createPool(config);
module.exports = connection;
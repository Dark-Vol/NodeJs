// Ставил новый модуль. (Команда для установки в файле server.js)
const mysql = require('mysql2/promise');
// const mysql = require('mysql');

// ! Вот тут поставь свои данные обратно (Я поставил свои для теста)
const config = {
    host: '172.17.0.2',
    user: 'root',
    password: 'pass',
    database: 'TIKod'
};

// Тут новый метод. Ибо мы использоуем другую библиотеку MYSQL
const connection = mysql.createPool(config);
module.exports = connection;

// connection.connect((err) => {
//     console.log(err)
// });


const connection = require('../config/db')

const UserModel = {
    create: (name,age) => {
        // SQL запрос на добавление в базу данных
        const query = `INSERT INTO users(name,age) VALUES("${name}","${age}")`
        connection.query(query)
    }
}

module.exports = UserModel


// Проверить, если такая таблица есть - ничего не делать. Если такой таблицы нет - создать таблицу
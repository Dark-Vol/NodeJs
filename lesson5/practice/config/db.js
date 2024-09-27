
const mysql = require('mysql')

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'learn'
}

const connection = mysql.createConnection(config)

connection.connect((err) => {
    console.log(err)
})

module.exports = connection

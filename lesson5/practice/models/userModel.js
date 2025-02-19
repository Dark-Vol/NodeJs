const connection = require('../config/db')

const UserModel = {
    create: (name,age) => {
        const query = `INSERT INTO users(name,age) VALUES("${name}","${age}")`
        connection.query(query)
    },
    getAll: (callback) => {
        const query = `SELECT * FROM users`
        connection.query(query, (err,result) => {
            if (err) {
                console.log('error')
            } else {
                callback(result)
            }
        })
    }
}

module.exports = UserModel



/*
    CRUD
    create -> POST       + 
    read   -> GET
    update -> PUT/PATH
    delete -> DELETE

*/



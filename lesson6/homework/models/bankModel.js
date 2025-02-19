const connection = require ("../config/db")

const BankModel = {
    getAll: async () => {
        const [rows] = await connection.query('SELECT * FROM bank');
        return rows;
    },

    create: async (name, users, capital) => {
        const [result] = await connection.query(`INSERT INTO bank (name, users, capital) VALUES ("${name}", "${users}", "${capital}")`);
        return result;
    },

    getOne: async (id) => {
        const [rows] = await connection.query(`SELECT * FROM bank WHERE id = ${id}`)
        return rows[0]
    },

    update: async (id, name, users, capital) => {
        await connection.query(`UPDATE bank SET name = "${name}", users = "${users}", capital = "${capital}" WHERE id = ${id}`)
    },
    
    delete: async (id) => {
        await connection.query(`DELETE FROM bank WHERE id = ${id}`);
    }
}

module.exports = BankModel;
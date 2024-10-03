const connection = require('../config/db');

const NewsModel = {
    getAll: async () => {
        const [rows] = await connection.query('SELECT * FROM news');
        return rows;
    },

    create: async (title,content) => {
        const [result] = await connection.query(`INSERT INTO news (title, content) VALUES ("${title}", "${content}")`);
        return result;
    },

    getOne: async (id) => {
        const [rows] = await connection.query(`SELECT * FROM news WHERE id = ${id}`)
        return rows[0]
    },

    update: async (id, title, content) => {
        await connection.query(`UPDATE news SET title = "${title}", content = "${content}" WHERE id = ${id}`)
    },
    
    delete: async (id) => {
        await connection.query(`DELETE FROM news WHERE id = ${id}`);
    }
};



// DELETE FROM table WHERE id = number

module.exports = NewsModel;
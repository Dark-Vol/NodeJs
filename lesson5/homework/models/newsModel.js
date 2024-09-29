const connection = require('../config/db');

/*
    Уходим от callback и используем async и await
*/

const NewsModel = {
    getAll: async () => {
        const [rows] = await connection.query('SELECT * FROM news');
        return rows;
    },

    create: async (title,content) => {
        const [result] = await connection.query(`INSERT INTO news (title, content) VALUES ("${title}", "${content}")`);
        return result;
    }
};

module.exports = NewsModel;

const connection = require('../config/db');

const NewsModel = {
    create: async (title, content, callback) => {
        const query = `INSERT INTO news(title, content) VALUES("${title}","${content}")`
        connection.query(query, (err,results) => {
            if (!err) {
                return callback()
            }
        })
    },

    getAll: (callback) => {
        const query = `SELECT * FROM news`;
        connection.query(query, (err, result) => {
            if (err) {
                console.log('Error while retrieving news:', err);
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }
};

module.exports = NewsModel;

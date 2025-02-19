const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'learn', 
    'root', 
    '', 
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;
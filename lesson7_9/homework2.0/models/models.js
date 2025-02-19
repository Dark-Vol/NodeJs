const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Student = sequelize.define('Student', {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = { Student };

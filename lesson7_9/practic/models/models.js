const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const Post = sequelize.define('Post', {
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    body: {type: DataTypes.STRING, allowNull: false}
})

module.exports = { Post }

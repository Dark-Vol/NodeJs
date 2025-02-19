const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    room: { type: DataTypes.STRING, unique: true }
});

const Administrator = sequelize.define("Administrator", {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

const Support = sequelize.define("Support", {
    title: { type: DataTypes.STRING(255), allowNull: false },
    statusClose: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Message = sequelize.define("Message", {
    text: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: Sequelize.NOW, allowNull: false },
});

User.hasMany(Message);
Message.belongsTo(User);

Administrator.hasMany(Message);
Message.belongsTo(Administrator);

Support.hasMany(Message);
Message.belongsTo(Support);

module.exports = {
    User,
    Administrator,
    Support,
    Message,
};

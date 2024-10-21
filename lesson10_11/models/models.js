const sequelize = require("../config/db");
const {DataTypes} = require('sequelize')

const Account = sequelize.define("Account", {
    email: {type: DataTypes.STRING(20), allowNull: false, unique:true},
    password: {type: DataTypes.STRING(20), allowNull: false},
}) 


const Profile = sequelize.define('Profile', {
    name: {type: DataTypes.STRING(20), allowNull: false},
    age: {type: DataTypes.INTEGER, allowNull: false},
    city: {type: DataTypes.STRING(20), allowNull: false},
})

const Photo = sequelize.define("Photo", {
    path: {type:DataTypes.STRING, allowNull: false, unique:true}
})

const LanguageProgramming = sequelize.define('LanguageProgramming', {
    name:  {type: DataTypes.STRING(20), allowNull: false},
    description:  {type: DataTypes.STRING(60), allowNull: false}
})


const Project = sequelize.define('Project', {  
    name: {type: DataTypes.STRING(20), allowNull: false, unique:true},
    description:  {type: DataTypes.STRING(60), allowNull: false}
})

Profile.hasMany(Photo)
Photo.belongsTo(Profile)

// 1 k 1
Account.hasOne(Profile, {onDelete:'CASCADE'})
Profile.belongsTo(Account)


// 1 k m
Profile.hasMany(Project);
Project.belongsTo(Profile)


// m k m
const ProfileLanguageProgramming = sequelize.define('ProfileLanguageProgramming',{})
Profile.belongsToMany(LanguageProgramming, {through:ProfileLanguageProgramming})
LanguageProgramming.belongsToMany(Profile, {through:ProfileLanguageProgramming})


module.exports = {Account, Profile, Profile, LanguageProgramming, Photo}
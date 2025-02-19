

const express = require('express')
const {Sequelize} = require('sequelize')
const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const sequelize = new Sequelize('learnRegister', 'root', '', {dialect:'mysql', host:'127.0.0.1', port:3306})
const app = express()

app.use(express.json());

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    admin: {type: DataTypes.BOOLEAN, defaultValue: false}
})

app.post('/api/account/register', async (req,res) => {
    const {email,password} = req.body

    if (!email || !password) {
        return res.status(400).json({message:"Некорректный логин или пароль"})
    }

    const finded_user = await User.findOne({where: {email:email}})
    if (finded_user) {
        return res.status(400).json({message:"Такой аккаунт уже существует"})
    }

    const cryptPassword = await bcrypt.hash(password,4) 
    const user = await User.create({email:email, password: cryptPassword})

    const token = jwt.sign(user.id, 'fandfjn12j1nejdsfan123jn1fjds123',{expiresIn: "24h"})
    return res.status(201).json({token:token})
})

app.post('/api/account/login', async(req,res)=>{
    const {email,password} = req.body
    const finded_user = await User.findOne({where: {email:email}})

    if (!finded_user) {
        return res.status(400).json({message:"Такой аккаунт не существует"})
    }

    const resultCompare = bcrypt.compareSync(password,finded_user.password)
    if (!resultCompare) {
        return res.status(400).json({message:"Неверный пароль"})
    }

    const token = jwt.sign(finded_user.id, 'fandfjn12j1nejdsfan123jn1fjds123',{expiresIn: "24h"})
    return res.status(200).json({token:token})
})

app.post('/api/account/relogin', async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
        try {
            const id = jwt.verify(token,'fandfjn12j1nejdsfan123jn1fjds123')
            const newToken = jwt.sign(id, 'fandfjn12j1nejdsfan123jn1fjds123', {expiresIn: "24h"})
            return res.status(200).json({token:newToken})
        } catch(e) {
            return res.status(401).json({message:"Token not active"})        
        }
    } else {
        return res.status(401).json({message:"You not auth"})
    }
})

const start = async () => {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(5000,()=>console.log('server start on 4000 port'))
}

start()
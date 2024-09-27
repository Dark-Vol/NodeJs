const UserModel = require('../models/userModel')

const UserController = {
    createUser: (req,res) => {
        let body = '';
        req.on('data',chunk=>{
            body += chunk.toString()
        })
        req.on('end', () => {
            body = JSON.parse(body)
            UserModel.create(body.name, body.age)
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message:"User created"}))
        })
    },
    getUsers: (req,res) => {
        UserModel.getAll((users)=>{
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify(users))
        })
    }   
}

module.exports = UserController
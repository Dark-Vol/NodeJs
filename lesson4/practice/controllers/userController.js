const UserModel = require('../models/userModel')
// const getJson = require('../utils/json')

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
    }
}

module.exports = UserController
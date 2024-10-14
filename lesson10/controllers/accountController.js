
const {Account,Profile} = require('../models/models')

class AccountController {
    
    static async register(req,resp) {
        const account = await Account.create({email: req.body.email, password: req.body.password})
        const profile = await Profile.create(
            {
                name: req.body.name, 
                age: req.body.age,
                city: req.body.city,
                AccountId: account.id
            }
        )
        return resp.status(201).json({account,profile})
    }
}


module.exports = AccountController


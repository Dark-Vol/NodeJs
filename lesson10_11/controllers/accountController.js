
const {Account,Profile, Photo} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

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
        const files  = req.files
        for (const photo of files.photo) {
            const type = photo.mimetype.split('/')[1]
            const namePhoto = `${uuid.v4()}.${type}` 
            const pathToPhoto = path.resolve(__dirname,'..','static',namePhoto)
            photo.mv(pathToPhoto)
            
            const photoDb = await Photo.create({path:namePhoto, ProfileId:profile.id})
        }
        return resp.status(201).json({account,profile})
    }
}


module.exports = AccountController


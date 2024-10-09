
const {Post} = require('../models/models')

class PostsController {
    static async getAll(req,resp) {
        const posts = await Post.findAll()
        return resp.status(200).json(posts)
    }
    
    static async create(req,resp) {
        const post = await Post.create({title: req.body.title, body: req.body.body})
        return resp.status(201).json(post)
    }
}


module.exports = PostsController


// post.title = "hello"
// post.save()


// Post.update({where: ...})
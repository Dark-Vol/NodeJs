


class PostsController {
    static async getAll(req,resp) {
        return resp.status(200).json({message:"GET ALL OK"})
    }
    
    static async create(req,resp) {
        console.log(req.body)
        return resp.status(201).json({message:"CREATE OK"})
    }
}


module.exports = PostsController

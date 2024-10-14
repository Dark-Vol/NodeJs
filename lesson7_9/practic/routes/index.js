const Router = require('express')
const postsRouter = require('./postsRouter')

const router = new Router()

router.use('/posts', postsRouter)

module.exports = router

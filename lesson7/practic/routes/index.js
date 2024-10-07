const Router = require('express')
const postsRouter = require('./postsRouter')

const router = new Router()

router.use('/posts', postsRouter)
// router.use('/comments', )
// router.use('/products', )
// router.use('/category', )
// router.use('/comments', )

module.exports = router

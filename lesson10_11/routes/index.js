const Router = require('express')
const accountRouter = require('./accountRouter')

const router = new Router()

router.use('/account', accountRouter)

module.exports = router

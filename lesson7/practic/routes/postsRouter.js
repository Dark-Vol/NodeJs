const Router = require('express')
const postsController = require('../controllers/postsController')

const router = new Router()

router.get('/', postsController.getAll)
router.post('/', postsController.create)

module.exports = router
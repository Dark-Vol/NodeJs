const Router = require('express')
const AccountController = require('../controllers/accountController')

const router = new Router()

router.post('/register', AccountController.register)

module.exports = router

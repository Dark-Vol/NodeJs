const UserController = require('../controllers/userController')

const routes = (req,res) => {
    const method = req.method
    const url = req.url

    switch(method) {
        case "POST": {
            if (url == '/user') {
                UserController.createUser(req,res)
            }
        }
    }
}

module.exports = routes
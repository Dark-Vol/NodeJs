const UserController = require('../controllers/userController')

const routes = (req,res) => {
    const method = req.method
    const url = req.url

    switch(method) {
        case "POST": {
            if (url == '/users') {
                UserController.createUser(req,res)
            }
        }
        case "GET": {
            if (url == "/users") {
                UserController.getUsers(req,res)
            }
        }
    }
}

module.exports = routes
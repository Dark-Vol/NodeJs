const { 
    addUser, 
    deleteUser, 
    updateUser, 
    getAllUsers, 
    getSortedUsers, 
    getUserByName 
} = require('../controllers/userController');

const userRouter = (request, response) => {
    const method = request.method;
    const url = request.url;

    console.log(`Received ${method} request to ${url}`);

    response.setHeader('Content-Type', 'application/json');

    switch (method) {
        case 'POST': {
            if (url === '/add') {
                addUser(request);
            } else {
                response.statusCode = 404;
                response.end(JSON.stringify({ message: "Route not found" }));
            }
            break;
        }
        case 'DELETE': {
            if (url.startsWith('/delete/')) {
                deleteUser(request);
            } else {
                response.statusCode = 404;
                response.end(JSON.stringify({ message: "Route not found" }));
            }
            break;
        }
        case 'PUT': {
            if (url === '/update') {
                updateUser(request);
            } else {
                response.statusCode = 404;
                response.end(JSON.stringify({ message: "Route not found" }));
            }
            break;
        }
        case 'GET': {
            if (url === '/all') {
                getAllUsers(request);
            } else if (url === '/sorted') {
                getSortedUsers(request);
            } else if (url.startsWith('/phone/')) {
                getUserByName(request);
            } else {
                response.statusCode = 404;
                response.end(JSON.stringify({ message: "Route not found" }));
            }
            break;
        }
        default: {
            response.statusCode = 405;
            response.end(JSON.stringify({ message: "Method Not Allowed" }));
        }
    }

    response.on('finish', () => {
        console.log(`Response status code: ${response.end(JSON.stringify({ message: "Route not found" }))}`);
    });
};

module.exports = { userRouter };

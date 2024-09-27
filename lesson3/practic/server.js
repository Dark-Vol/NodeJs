const http = require('http');

const ip = '127.0.0.1';
const port = 3000;

const studentsList = [];

function getJson(request) {
    let body = '';
    request.on("data", (chunk) => {
        body += chunk.toString();
    });
    request.on("end", () => {
        return JSON.parse(body)
    });
}

const students = (request, response) => {
    const method = request.method;
    const url = request.url;

    response.setHeader('Content-Type', 'application/json');

    switch (method) {
        case 'POST': {
            if (url === '/students') {
                const data = getJson(request)     
                studentsList.push(data);
                response.statusCode = 201;
                response.end(JSON.stringify({ message: "POST CREATED" }));
            }
            break;
        }
        case 'GET': {
            if (url === '/students') {
                response.statusCode = 200;
                response.end(JSON.stringify(studentsList));
            }
            break;
        }
        case 'PUT': {
            if (url.startsWith('/students/')) {
                const index = parseInt(url.split('/')[2], 10);
                const data = getJson(request)
                if (index >= 0 && index < studentsList.length) {
                    studentsList[index] = JSON.parse(data);
                    response.statusCode = 200;
                    response.end(JSON.stringify({ message: "PUT UPDATED" }));
                } else {
                    response.statusCode = 404;
                    response.end(JSON.stringify({ message: "Student not found" }));
                }
            }
            break;
        }
        case 'DELETE': {
            if (url.startsWith('/students/')) {
                const index = parseInt(url.split('/')[2], 10);
                if (index >= 0 && index < studentsList.length) {
                    studentsList.splice(index, 1);
                    response.statusCode = 200;
                    response.end(JSON.stringify({ message: "DELETE SUCCESSFUL" }));
                } else {
                    response.statusCode = 404;
                    response.end(JSON.stringify({ message: "Student not found" }));
                }
            }
            break;
        }
        default: {
            response.statusCode = 405;
            response.end(JSON.stringify({ message: "Method Not Allowed" }));
        }
    }
};

const server = http.createServer(students);
server.listen(port, ip, () => console.log(`Server start on ${ip}:${port}`));


// Pattern - общепринятая структура реализации, кода, разбивки на файлы и т.д
// MVC - 
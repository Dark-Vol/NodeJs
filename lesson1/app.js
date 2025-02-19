

const http = require('http')

const ip = '127.0.0.1'
const port = 2000


const user = {
    name: "Sasha",
    age: 23
}

const actionRequest = (request, response) => {
    const method = request.method
    const url = request.url

    response.setHeader('Content-Type', 'application/json')

    switch(method) {
        case "GET": {
            if (url == "/user") {
                response.statusCode = 200
                const userJson = JSON.stringify(user)
                return response.end(userJson);
            } else if (url == '/admin') {
                response.statusCode = 403
                return response.end(JSON.stringify({error:"Доступ ограничен"}))
            }
            break
        }
        case "POST": {
            break
        }
        case "PUT": {
            break
        }
        case "DELETE": {
            break
        }
        default: {
            // Текст, что сервер не поддерживает такие запросы
        }
    }

    return response.end("Ошибка")
}

const server = http.createServer(actionRequest)

server.listen(port,ip,()=>console.log(`Server start on ${ip}:${port}`))


/*

    DZ

    1 - Прочитать все статус коды. Позапоминать статусы за частные ситуации 

*/
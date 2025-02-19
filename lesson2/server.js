
const http = require('http');

const ip = '127.0.0.1'
const port = 3000

const posts = []

const action  = (request,response) => {
    const method = request.method
    const url = request.url

    response.setHeader('Content-Type', 'application/json')

    switch(method) {
        case 'POST': {
            if (url == '/posts') {
                let body = ''
                request.on('data', (chunk)=>{
                    body += chunk.toString()
                })
                request.on('end',() => {
                    /*
                        const result = JSON.parse(body)
                        if (result ... not title) {
                            response.statusCode = 400
                            response.end(error)
                        } 

                        const nameCode = {title: '400', name:'Bad Request'}
                        if(result == nameCode.name){}
                    */
                    posts.push(JSON.parse(body))
                    response.statusCode = 201
                    response.end(JSON.stringify({message:"POST CREATED"}))
                    console.log(posts)
                })
            }
            break;
        }
        case 'GET': {
            if (url == '/posts') {

            }
            break;
        }
        case 'PUT': {
            if (url == '/posts') {

            }
            break;
        }
        case 'DELETE': {
            if (url == '/posts') {

            }
            break;
        }
    }
}

const server = http.createServer(action)
server.listen(port,ip, ()=>console.log(`Server start on ${ip}:${port}`))




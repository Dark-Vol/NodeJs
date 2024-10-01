const http = require('http')
const newsRouter = require('./routes/newsRouter')

const ip = '127.0.0.1'
const port = 3000

const server = http.createServer(newsRouter)

server.listen(port, ip, () => console.log('server start'))


/*
    Модули для установки

    npm uninstall mysql - Удаляем старую библиотеку
    npm install mysql2 - Ставим новую библиотеку

    npm install body-parser - Модуль который за тебя реализовует:
    let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            body = JSON.parse(body);
    }
    Вместо тебе конвертирует и собирает JSON (Удобнее так, должны смотреть были на уроке. Заспойлерю раньше :) )

*/
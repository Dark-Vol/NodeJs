const NewsController = require("../controllers/newsController");

const routes = async (req, res) => {
    const method = req.method;
    const url = req.url;

    console.log(method,url)

    switch (method) {
        case "POST": {
            if (url === '/news') {
                // Cоздаем пост и даем ответ 
                // Так же я вынес сюда получение JSON и сразу передаю его в контроллер
                let body = '';

                req.on('data', chunk => {
                    body += chunk.toString();
                });

                req.on('end', async () => {
                    return await NewsController.createNews(req, res, JSON.parse(body));
                });
            }
            // Упустили важный break
            break
        }
        case "GET": {
            if (url === "/news") {
                // Дожидаемся значения и возвращаем их
                return await NewsController.getNews(req, res);
            }
            break
        }
    }
};

module.exports = routes;

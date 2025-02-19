const NewsController = require("../controllers/newsController");

const routes = async (req, res) => {
    const method = req.method;
    const url = req.url;

    console.log(method,url)

    switch (method) {
        case "POST": {
            if (url === '/news') {
                let body = '';

                req.on('data', chunk => {
                    body += chunk.toString();
                });

                req.on('end', async () => {
                    return await NewsController.createNews(req, res, JSON.parse(body));
                });
            }
            break
        }
        case "PUT": {
            if (url.match(/\/news\/\d+/)) { 
                const id = url.split('/')[2]
                console.log(id)
                let body = '';

                req.on('data', chunk => {
                    body += chunk.toString();
                });

                req.on('end', async () => {
                    return await NewsController.updateNews(req, res, id, JSON.parse(body));
                });
            }
            break
        }
        case "DELETE": {
            if (url.match(/\/news\/\d+/)) {
                const id = url.split('/')[2];
                console.log(id);
                return await NewsController.deleteNews(req, res, id);
            }
            break;
        }
        case "GET": {
            if (url === "/news") {
                return await NewsController.getNews(req, res);
            }
            break
        }
    }
};

module.exports = routes;

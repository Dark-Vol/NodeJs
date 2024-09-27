const NewsController = require("../controllers/newsController");

const routes = async (req, res) => {
    const method = req.method;
    const url = req.url;

    switch (method) {
        case "POST": {
            if (url === '/news') {
                NewsController.createNews(req, res);
            }
        }
        case "GET": {
            if (url === "/news") {
                NewsController.getNews(req, res);
            }
        }
    }
};

module.exports = routes;

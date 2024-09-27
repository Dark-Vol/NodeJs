const NewsModel = require('../models/newsModel');

const NewsController = {
    createNews: (req, res) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            body = JSON.parse(body);
            await NewsModel.create(body.title, body.content, () => {
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ message: "News created" }));
            });
        });
    },
    getNews: (req, res) => { 
        NewsModel.getAll((news) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(news));
        });
    }
};

module.exports = NewsController;

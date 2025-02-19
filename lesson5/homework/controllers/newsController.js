const NewsModel = require('../models/newsModel');


/*
    Показал 2 варианта работы с headers. 
    Обрати внимание в создании и получении 2 разных 

*/


const NewsController = {
    createNews: async (req, res,body) => {
        // Отправляем запрос и дожидаемся пока дойдет. Потом ставим статус код и дает ответ.
        await NewsModel.create(body.title, body.content);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ message: "News created" }));
    },
    getNews: async (req, res) => { 
        // Получаем с базы данных новости
        const news = await NewsModel.getAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(news));
    }
};

module.exports = NewsController;

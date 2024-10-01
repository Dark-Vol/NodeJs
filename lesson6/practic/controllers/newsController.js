const NewsModel = require('../models/newsModel');

const NewsController = {
    createNews: async (req, res,body) => {
        await NewsModel.create(body.title, body.content);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ message: "News created" }));
    },
    getNews: async (req, res) => { 
        const news = await NewsModel.getAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(news));
    },
    updateNews: async (req,res,id,body) => {
        const newsOne = await NewsModel.getOne(id)
        await NewsModel.update(
            id,
            body.title ? body.title : newsOne.title, 
            body.content ? body.content : newsOne.content
        )
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message:"news updated"}))
    },
    deleteNews: async (req, res, id) => {
        const newsOne = await NewsModel.getOne(id);
        if (!newsOne) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "News not found" }));
        }
        await NewsModel.delete(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "News deleted" }));
    }
};

module.exports = NewsController;

const BankController = require("../controllers/bankController");

const routes = async (req, res) => {
    const method = req.method;
    const url = req.url;
    switch (method){
        case "POST":{
            if(url=== "/bank"){
                let body = "";
                req.on("data", chunk =>{
                    body += chunk.toString();
                });
                req.on("data", async() =>{
                    return await BankController.createBank(req, res, JSON.parse(body))
                });
            }
            break
        }
        case "PUT":{
            if(url.match(/\/bank\/\d+/)){
                const id = url.split("/")[2];
                let body = "";
                req.on("data", chunk =>{
                    body += chunk.toString();
                });
                req.on("data", async() =>{
                    return await BankController.updateBank(req, res, id, JSON.parse(body))
                });
            }
            break
        }
        case "DELETE":{
            if(url.match(/\/bank\/\d+/)){
                const id = url.split("/")[2];
                return await BankController.deleteBank(req, res, id)
            }
            break
        }
        case "GET":{
            if(url=== "/bank"){
                return await BankController.getBank(req, res);
            }
            break
        }
    }
}

module.exports = routes;
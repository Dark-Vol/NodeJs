const BankModel = require('../models/bankModel');

const BankController = {
    createBank: async (req, res, body) => {
        try {
            await BankModel.create(body.name, body.users, body.capital);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ message: "completed" }));
        } catch (error) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ message: "Error creating bank", error }));
        }
    },
    getBank: async (req, res) => {
        try {
            const bank = await BankModel.getAll();
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(bank));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Error fetching banks", error }));
        }
    },
    updateBank: async (req, res, id, body) => {
        try {
            const bankOne = await BankModel.getOne(id);
            if (!bankOne) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Bank not found" }));
            }
            await BankModel.update(
                id,
                body.name || bankOne.name,
                body.users || bankOne.users,
                body.capital || bankOne.capital
            );
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Bank updated" }));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Error updating bank", error }));
        }
    },
    deleteBank: async (req, res, id) => {
        try {
            const bankOne = await BankModel.getOne(id);
            if (!bankOne) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Bank not found" }));
            }
            await BankModel.delete(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Bank deleted" }));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Error deleting bank", error }));
        }
    }
};

module.exports = BankController;
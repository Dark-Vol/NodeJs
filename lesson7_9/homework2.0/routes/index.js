const Router = require('express');
const studentsRouter = require("./studentsRouter");

const router = new Router();

router.use("/students", studentsRouter);

module.exports = router;
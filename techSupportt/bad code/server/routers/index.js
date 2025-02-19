const Router = require("express");
const chatRoutes = require("./chatRoutes");
const accountRoutes = require("./accountRoutes");

const router = new Router();

router.use("/chat", chatRoutes);
router.use("/account", accountRoutes);

module.exports = router;
const Router = require('express');
const studentsRouter = require('./studentsRouter');
const teachersRouter = require('./teachersRouter');

const router = new Router();

router.use('/students', studentsRouter);
router.use('/teachers', teachersRouter);

module.exports = router;

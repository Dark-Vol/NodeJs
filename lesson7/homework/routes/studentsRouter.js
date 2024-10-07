const Router = require('express');
const studentsController = require('../controllers/studentsController');

const router = new Router();

router.get('/', studentsController.getAll);
router.post('/', studentsController.create);
router.put('/', studentsController.update);
router.delete('/', studentsController.delete);

module.exports = router;

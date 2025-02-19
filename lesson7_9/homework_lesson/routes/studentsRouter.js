const Router = require('express');
const studentsController = require('../controllers/studentsController');

const router = new Router();

router.get('/', studentsController.getAll);
router.get("/:id", studentsController.getOne );
router.post('/', studentsController.create);
router.put('/:id', studentsController.updateForKey);
router.put('/', studentsController.updateForQuery);
router.delete('/:id', studentsController.delete);

module.exports = router;

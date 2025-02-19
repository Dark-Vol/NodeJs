const Router = require('express');
const teachersController = require('../controllers/teachersController');

const router = new Router();

router.get('/', teachersController.getAll);
router.post('/', teachersController.create);
router.put('/', teachersController.update);
router.delete('/', teachersController.delete);

module.exports = router;
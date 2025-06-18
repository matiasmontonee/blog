const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/postController');

router.get('/',   ctrl.list);
router.get('/:id', ctrl.getOne);
router.post('/',  ctrl.create);
router.put('/:id',   ctrl.updateOne);
router.delete('/:id',ctrl.remove);

module.exports = router;
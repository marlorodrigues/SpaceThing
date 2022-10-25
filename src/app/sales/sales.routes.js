const express = require('express');
const router = express.Router({ 
    mergeParams: true,
    caseSensitive: true
});

const salesController = require('./sales.controllers');

const auth = require('../../middlewares/auth');
const unexpected = require('../../middlewares/errors');

router.post('/', auth.verify_token, salesController.create_sale, unexpected.unexpectedException);
router.get('/', auth.verify_token, salesController.find, unexpected.unexpectedException);
router.put('/', auth.verify_token, salesController.update_sale, unexpected.unexpectedException);
router.delete('/:sale_id', auth.verify_token, salesController.delete_sale, unexpected.unexpectedException);

module.exports = router;
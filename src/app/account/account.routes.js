const express = require('express');
const router = express.Router({ 
    mergeParams: true,
    caseSensitive: true
});

const accountController = require('./account.controllers');

const auth = require('../../middlewares/auth');
const unexpected = require('../../middlewares/errors');

router.post('/', auth.verify_token, accountController.create, unexpected.unexpectedException);
router.get('/', auth.verify_token, accountController.find, unexpected.unexpectedException);
router.put('/', auth.verify_token, accountController.update, unexpected.unexpectedException);
router.delete('/', auth.verify_token, accountController.delete, unexpected.unexpectedException);

module.exports = router;
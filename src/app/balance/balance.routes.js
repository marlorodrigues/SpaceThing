const express = require('express');
const router = express.Router({ 
    mergeParams: true,
    caseSensitive: true
});

const salesController = require('./balance.controllers');

const auth = require('../../middlewares/auth');
const unexpected = require('../../middlewares/errors');

router.post('/', auth.verify_token, salesController.create, unexpected.unexpectedException);

router.get('/sales/today', auth.verify_token, salesController.find_current_sales, unexpected.unexpectedException);
router.get('/expenses/today', auth.verify_token, salesController.find_current_expenses, unexpected.unexpectedException);



// router.get('/futures', auth.verify_token, salesController.find_futures_pay, unexpected.unexpectedException);
router.get('/sales/history', auth.verify_token, salesController.history, unexpected.unexpectedException);
router.put('/', auth.verify_token, salesController.update, unexpected.unexpectedException);
router.delete('/', auth.verify_token, salesController.delete, unexpected.unexpectedException);

module.exports = router;
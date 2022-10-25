const express = require('express');
const router = express.Router();

const usersController = require('./users.controllers');

const auth = require('../../middlewares/auth');
const unexpected = require('../../middlewares/errors');


router.get('/', auth.verify_token, usersController.create_user, unexpected.unexpectedException);
router.get('/:user_id', auth.verify_token, usersController.find_one, unexpected.unexpectedException);
router.get('/all', auth.verify_token, usersController.find_all, unexpected.unexpectedException);
router.put('/', auth.verify_token, usersController.update_user, unexpected.unexpectedException);
router.delete('/:user_id', auth.verify_token, usersController.delete_user, unexpected.unexpectedException);


module.exports = router;
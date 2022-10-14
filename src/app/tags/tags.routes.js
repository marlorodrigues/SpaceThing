const express = require('express');
const router = express.Router();
const tagController = require('./tags.controllers')
const auth = require('../../middlewares/auth')
const unexpected = require('../../middlewares/unexpected')

router.post('/createTag', auth.verify_token, tagController.createTag, unexpected.unexpectedException)
router.get('/showTags', auth.verify_token, tagController.showMeAllThings, unexpected.unexpectedException)
router.put('/editTag/:tagId', auth.verify_token, tagController.editTag, unexpected.unexpectedException)
router.get('/showTag/:tagId', auth.verify_token, tagController.showMeOneTag, unexpected.unexpectedException)
router.delete('/removeTag/:tagId', auth.verify_token, tagController.deleteTag, unexpected.unexpectedException)

module.exports = router;

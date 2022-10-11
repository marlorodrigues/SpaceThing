const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagsController')

router.post('/createTag', tagController.createTag)
router.get('/showTags', tagController.showMeAllThings)
router.put('/editTag/:tagId', tagController.editTag)
router.get('/showTag/:tagId', tagController.showMeOneTag)
router.delete('/removeTag/:tagId', tagController.deleteTag)

module.exports = router;

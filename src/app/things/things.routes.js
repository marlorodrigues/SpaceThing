const express = require('express');
const router = express.Router();
const thingsController = require('./things.controllers')
const tagController = require('../tags/tags.controllers')
const auth = require('../../middlewares/auth')
const unexpected = require('../../middlewares/unexpected')

router.get('/showAll/', auth.verify_token, thingsController.showMeAllThings, unexpected.unexpectedException)
router.get('/show/:thingId', auth.verify_token, thingsController.showMeOneThing, unexpected.unexpectedException)
router.post('/create', auth.verify_token, thingsController.createThing, unexpected.unexpectedException)
router.put('/edit/:thingId', auth.verify_token, thingsController.editThing, unexpected.unexpectedException)
router.delete('/remove/:thingId', auth.verify_token, thingsController.deleteThing, unexpected.unexpectedException)

//Temp ate a implementacao das routes estarem separadas
router.post('/createTag', auth.verify_token, tagController.createTag, unexpected.unexpectedException)
router.get('/showTags', auth.verify_token, tagController.showMeAllThings, unexpected.unexpectedException)
router.put('/editTag/:tagId', auth.verify_token, tagController.editTag, unexpected.unexpectedException)
router.get('/showTag/:tagId', auth.verify_token, tagController.showMeOneTag, unexpected.unexpectedException)
router.delete('/removeTag/:tagId', auth.verify_token, tagController.deleteTag, unexpected.unexpectedException)


module.exports = router;

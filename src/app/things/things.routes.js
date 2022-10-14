const express = require('express');
const router = express.Router();
const thingsController = require('./things.controllers')
const tagController = require('../tags/tags.controllers')
const auth = require('../../middlewares/auth')
const unexpected = require('../../middlewares/unexpected')

router.get('/showAll/', auth.verify_token, thingsController.showMeAllThings)
router.get('/show/:thingId', auth.verify_token, thingsController.showMeOneThing)
router.post('/create', auth.verify_token, thingsController.createThing)
router.put('/edit/:thingId', auth.verify_token, thingsController.editThing)
router.delete('/remove/:thingId', auth.verify_token, thingsController.deleteThing)

//Temp ate a implementacao das routes estarem separadas
router.post('/createTag', auth.verify_token, tagController.createTag)
router.get('/showTags', auth.verify_token, tagController.showMeAllThings)
router.put('/editTag/:tagId', auth.verify_token, tagController.editTag)
router.get('/showTag/:tagId', auth.verify_token, tagController.showMeOneTag)
router.delete('/removeTag/:tagId', auth.verify_token, tagController.deleteTag)


module.exports = router;

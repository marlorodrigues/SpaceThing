const express = require('express');
const router = express.Router();
const thingsController = require('../controllers/thingsController')
const tagController = require('../controllers/tagsController')


router.get('/showAll/', thingsController.showMeAllThings)
router.get('/show/:thingId', thingsController.showMeOneThing)
router.get('/create', thingsController.createThing)
router.put('/edit/:thingId', thingsController.editThing)
router.delete('/remove/:thingId', thingsController.deleteThing)

//Temp ate a implementacao das routes estarem separadas
router.post('/createTag', tagController.createTag)
router.get('/showTags', tagController.showMeAllThings)
router.put('/editTag/:tagId', tagController.editTag)
router.get('/showTag/:tagId', tagController.showMeOneTag)
router.delete('/removeTag/:tagId', tagController.deleteTag)


module.exports = router;

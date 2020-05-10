const express = require('express');
const router = express.Router();
const thingsController = require('../controllers/thingsController')


router.get('/show/', thingsController.showMeAllThings)
router.get('/show/:thingId', thingsController.showMeOneThing)
router.post('/create', thingsController.createThing)
router.put('/edit', thingsController.editThing)
router.delete('/remove', thingsController.deleteThing)


module.exports = router;

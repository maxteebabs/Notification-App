const express = require('express');
const router = express.Router();

const subscriberController = require('./controllers/SubscriberController');

router.post('/:topic', subscriberController.display);

module.exports = router;
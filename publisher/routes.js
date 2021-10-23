const express = require('express');
const router = express.Router();

const publisherController = require('./controllers/PublisherController');
router.post('/publish/:topic', publisherController.publish);
router.post('/subscribe/:topic', publisherController.subscribe);

module.exports = router;
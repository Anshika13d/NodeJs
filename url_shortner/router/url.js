const express = require('express');
const { handleGenerateNewShortUrl } = require('../Controller/url')

const router = express.Router;

router.post('/', handleGenerateNewShortUrl);

module.exports = router
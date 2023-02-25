const express = require('express');
const router = express.Router();

const { getReviews } = require('../../controllers/mentor/getReviews');

router.get('/', getReviews);

module.exports = router;

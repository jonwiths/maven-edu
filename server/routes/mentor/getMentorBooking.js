const express = require('express');
const router = express.Router();

const {
  getMentorBooking
} = require('../../controllers/mentor/getMentorBooking');

router.get('/', getMentorBooking);

module.exports = router;

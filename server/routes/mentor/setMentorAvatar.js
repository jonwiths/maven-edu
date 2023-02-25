const express = require('express');
const router = express.Router();

const { setMentorAvatar } = require('../../controllers/mentor/setMentorAvatar');

router.post('/', setMentorAvatar);

module.exports = router;

const response = require('../response.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    await response.Update(req, res, 'question_vote');
});

module.exports = router;
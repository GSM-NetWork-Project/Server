const response = require('../response.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    await response.Insert(req, res, 'question_comment');
});

module.exports = router;
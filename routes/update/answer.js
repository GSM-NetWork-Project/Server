const response = require('../response.js');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res, next) => {
    await response.Update(req, res, 'answer');
});

module.exports = router;
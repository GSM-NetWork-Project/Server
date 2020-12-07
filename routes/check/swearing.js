const response = require('../response.js');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res, next) => {
    await response.CheckSwearing(req, res);
});

module.exports = router;
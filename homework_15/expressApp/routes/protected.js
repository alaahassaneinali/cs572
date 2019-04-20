var express = require('express');
var router = express.Router();

router.post('/', async (req, res) => {
    res.json(true);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Season = require('../models/seasonsModel');

// GET /api/seasons/1
router.get('/:id', async function (req, res, next) {
    try {
        console.log("Get cities of the season");
        let result = await Season.getSeasonCity(req.params.id);

        res.status(result.status).send(result.result);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
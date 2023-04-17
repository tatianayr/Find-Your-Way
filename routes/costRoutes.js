const express = require('express');
const router = express.Router();
const Cost = require('../models/costModel');


router.get('/:id', async function (req, res, next) {
    try {
        console.log("Get cost of the cities");
        let result = await Cost.getCityCost(req.params.id);
        res.status(result.status).send(result.result);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
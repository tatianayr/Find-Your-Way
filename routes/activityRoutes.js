const express = require('express');
const router = express.Router();
const Activity = require('../models/activityModel');


router.get('/:id', async function (req, res, next) {
    try {
        console.log("Get activities of the cities");
        let result = await Activity.getCityActivity(req.params.id);
        res.status(result.status).send(result.result);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
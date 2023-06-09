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

router.get('/cost/:seasonId/:historyId/:activityId', async function (req, res, next) {
    try {
      console.log("Get history of cities");
      let result = await Activity.getCostByActivity(req.params.seasonId, req.params.historyId, req.params.activityId);
      res.status(result.status).send(result.result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

module.exports = router;
const express = require('express');
const router = express.Router();
const History = require('../models/historyModel');

router.get('/:id', async function (req, res, next) {
    try {
        console.log("Get history of cities");
        let result = await History.getHistoryCity(req.params.id);
        res.status(result.status).send(result.result);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/activities/:seasonId/:historyId', async function (req, res, next) {
  try {
    console.log("Get history of cities");
    let result = await History.getActivityByHistory(req.params.seasonId, req.params.historyId);
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
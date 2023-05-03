const express = require("express");
const router = express.Router();
const num = require("../models/numbCitiesModel.js");
const Activity = require("../models/activityModel.js");
const City = require("../models/cidadeModel.js"); // Import the city model

router.get("/:id", async function (req, res, next) {
  try {
    console.log("Get history of cities");
    let result = await num.getNumberOfCities(req.params.id);
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:seasonId/:historyId/:activityId/:costName", async function (req, res, next) {
  try {
    console.log("Get cities");
    let result = await City.getCities(req.params.seasonId, req.params.historyId, req.params.activityId, req.params.costName);
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
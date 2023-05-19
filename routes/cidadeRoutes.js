const express = require('express');
const router = express.Router();
const City = require("../models/cidadeModel");

router.get('', async function (req, res, next){
    try {
        console.log("Get all cities");
        let result= await City.getCities();
        res.status(result.status).send(result.result);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
router.get('/point', async (req, res) => {
  try {
    console.log('Get all cities');
    let result = await City.getCitiess();
    res.status(result.status).json(result.result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/polygon', async (req, res, next) => {
  try {
    const result = await City.getPolygon();
    res.status(result.status).json(result.result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

  router.get('/form/:seasonId/:historyId/:activityId/:costId', async (req, res, next) => {
    try {
      const { status, result } = await City.getNameOfCitiesByForm(req.params.seasonId, req.params.historyId, req.params.activityId, req.params.costId);
      res.status(status).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

module.exports = router;
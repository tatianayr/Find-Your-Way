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

router.get('/polygon', async (req, res, next) => {
    try {
      const { status, result } = await City.getPolygon();
      res.status(status).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

module.exports = router;
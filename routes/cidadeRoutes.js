const express = require('express');
const router = express.Router();
const City = require("../models/cidadeModel");

router.get('/all', async function (req, res, next){
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

  router.post('/', async (req, res) => {
    try {
      const { seasonId, historyId, activityId, costId } = req.body;
  
      // Call the getNameOfCitiesByForm function to retrieve cities data
      const citiesResponse = await City.getNameOfCitiesByForm(seasonId, historyId, activityId, costId);
      const cities = citiesResponse.result;
  
      // Save cit_name and geom to the route table
      for (const city of cities) {
        await pool.query("INSERT INTO route (cit_name, geom) VALUES ($1, ST_GeomFromGeoJSON($2))", [city.cit_name, JSON.stringify(city.geom)]);
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error saving route data:', error);
      res.sendStatus(500);
    }
  });
 
  
  
  
  
  
  


module.exports = router;
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

module.exports = router;
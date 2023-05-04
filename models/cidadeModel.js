const pool = require("../config/database");

function dbCitytoCity(cit){
    return new City(cit.cit_id, cit.cit_name, cit.geom);
}

class City{
    constructor(id, name, geom){
        this.id = id;
        this.name = name;
        this.geom = geom;
    }

    static async getCities(){
        try {
            let dbResult= await pool.query("select * from cities");
            let dbCities= dbResult.rows;
            let cits= [];
            for(let dbCit of dbCities){
                cits.push(dbCitytoCity(dbCit));
            }
            return {status:200, result: cits};
            
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }

    static async getPolygon() {
        try {
          const query = 'SELECT ST_asgeoJson(ST_ConvexHull(ST_Collect(Array (select geom::geometry from cities)))) as polygon';
          const result = await pool.query(query);
          console.log('Query result:', result);
          const polygon = result.rows[0].polygon;
          console.log('Polygon:', polygon);
          return { status: 200, result: { polygon } };
        } catch (err) {
          console.error(err);
          return { status: 500, result: { msg: 'Something went wrong.' } };
        }
      }

      static async getNameOfCitiesByForm(sea_id, hist_id, act_id, cost_id) {
        try {
            let dbResult = await pool.query("SELECT DISTINCT cities.cit_name, ST_asgeoJson(cities.geom) FROM history INNER JOIN ch ON hist_id = ch_hist_id INNER JOIN sc ON ch_cit_id = sc_cit_id INNER JOIN ca ON ca_cit_id = ch_cit_id INNER JOIN activity ON ca_act_id = act_id INNER JOIN cc ON cc_cit_id = ca_cit_id INNER JOIN cost ON cc_cost_id = cost_id  INNER JOIN cities ON cities.cit_id = ch.ch_cit_id WHERE sc_sea_id = $1 AND hist_id = $2 AND act_id = $3 AND cost_id = $4", [sea_id, hist_id, act_id, cost_id]);
            let dbCity = dbResult.rows;
            console.log(dbCity)
            let cities = [];
            for (let cit of dbCity) {
                cities.push(cit);
            }
            return { status: 200, result: cities };
        } catch (err) {
            console.log(err);
            return { status: 500, result: { msg: "Something went wrong." } };
        }
       
      }
}
module.exports = City;
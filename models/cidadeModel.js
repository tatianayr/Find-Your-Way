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
}
module.exports = City;
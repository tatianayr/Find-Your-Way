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
    static async getCitiess() {
        try {
          const query = 'SELECT cit_name, ST_AsGeoJSON(geom) AS geom FROM cities';
          const { rows } = await pool.query(query);
          const cities = rows.map(row => ({
            cit_name: row.cit_name,
            geom: JSON.parse(row.geom),
          }));
          return { status: 200, result: cities };
        } catch (error) {
          console.error('Error fetching city data:', error);
          return { status: 500, result: { error: 'Failed to fetch city data' } };
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
          const dbResult = await pool.query("SELECT DISTINCT cities.cit_name, ST_asgeojson(cities.geom) FROM history INNER JOIN ch ON hist_id = ch_hist_id INNER JOIN sc ON ch_cit_id = sc_cit_id INNER JOIN ca ON ca_cit_id = ch_cit_id INNER JOIN activity ON ca_act_id = act_id INNER JOIN cc ON cc_cit_id = ca_cit_id INNER JOIN cost ON cc_cost_id = cost_id INNER JOIN cities ON cities.cit_id = ch.ch_cit_id WHERE sc_sea_id = $1 AND hist_id = $2 AND act_id = $3 AND cost_id = $4", [sea_id, hist_id, act_id, cost_id]);
    
          const dbCity = dbResult.rows;
          console.log(dbCity);
    
          const cities = dbCity.map(cit => {
            return {
              cit_name: cit.cit_name,
              geom: JSON.parse(cit.st_asgeojson)
            };
          });
    
          for (const city of cities) {
            await pool.query("INSERT INTO route (cit_name, geom) VALUES ($1, ST_GeomFromGeoJSON($2))", [city.cit_name, JSON.stringify(city.geom)]);
          }
    
          return { status: 200, result: cities };
        } catch (err) {
          console.log(err);
          return { status: 500, result: { msg: "Something went wrong." } };
        }
      }
      static async getCityInfo(cit_name) {
        try {
          // Consulta ao banco de dados para obter as informações e a imagem da cidade correspondente
          const query = `SELECT cit_info, cit_img FROM cities WHERE cit_name = $1`;
          const values = [cit_name];
      
          const result = await pool.query(query, values);
      
          if (result.rows.length > 0) {
            const cit_info = result.rows[0].cit_info;
            const cit_img = result.rows[0].cit_img;
      
            // Montar os dados de resposta em um objeto
            const responseData = {
              cit_info,
              cit_img
            };
      
            return responseData;
          } else {
            throw new Error('Cidade não encontrada');
          }
        } catch (error) {
          console.error('Erro na consulta ao banco de dados:', error);
          throw new Error('Erro no servidor');
        }
      }
    }
module.exports = City;
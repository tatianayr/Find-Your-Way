const pool = require("../config/database");

function dbCitytoCity(cit){
    return new City(cit.cit_id, cit.cit_name);
}

class City{
    constructor(id, name){
        this.id = id;
        this.name = name;
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
}
module.exports = City;
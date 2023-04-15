const pool = require("../config/database");

function dbActivityToActivity(cit){
    return new City(cit.ca_act_id,cit.ca_cit_id);
}

class City{
    constructor(id, name){
        this.id=id;
        this.name=name;
    }
    export(){
        act.id=this.id;
        act.name=this.name;
        return new City();
    }


    static async getCityActivity(act_id) {
        if (!act_id) {
            return { status: 400, result: { msg: "Invalid city parameter." } };
        }
        try {
            let dbResult = await pool.query("select*from ca where ca_cit_id = $1", [act_id]);
            let dbCityAct = dbResult.rows;
            console.log(dbCityAct)
            let cities = [];
            for (let cit of dbCityAct) {
                // { id_estacao, id_cidade }
                cities.push(dbActivityToActivity(cit));
            }
            return { status: 200, result: cities };
        } catch (err) {
            console.log(err);
            return { status: 500, result: { msg: "Something went wrong." } };
        }
    }
}module.exports = City;

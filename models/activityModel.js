const pool = require("../config/database");

function dbActivityToActivity(act){
    return new Activity(act.ca_act_id,act.ca_cit_id);
}

class Activity{
    constructor(id, name){
        this.id=id;
        this.name=name;
    }
    export(){
        act.id=this.id;
        act.name=this.name;
        return new Activity();
    }


    static async getCityActivity(act_id) {
        if (!act_id) {
            return { status: 400, result: { msg: "Invalid city parameter." } };
        }
        try {
            let dbResult = await pool.query("select*from ca where ca_cit_id = $1", [act_id]);
            let dbCityAct = dbResult.rows;
            console.log(dbCityAct)
            let activities = [];
            for (let act of dbCityAct) {
                // { id_estacao, id_cidade }
                activities.push(dbActivityToActivity(act));
            }
            return { status: 200, result: activities };
        } catch (err) {
            console.log(err);
            return { status: 500, result: { msg: "Something went wrong." } };
        }
    }

    static async getCostByActivity(sea_id, hist_id, act_id) {
        /*
       SELECT * FROM history INNER JOIN ch ON hist_id = ch_hist_id INNER JOIN sc ON ch_cit_id = sc_cit_id WHERE sc_sea_id = 1;
        */
        if (!act_id) {
            return { status: 400, result: { msg: "Invalid season parameter." } };
        }
        try {
            let dbResult = await pool.query("SELECT distinct cost_name FROM history INNER JOIN ch ON hist_id = ch_hist_id  INNER JOIN sc ON ch_cit_id = sc_cit_id INNER JOIN ca ON ca_cit_id= ch_cit_id INNER JOIN activity ON ca_act_id=act_id   INNER JOIN cc ON cc_cit_id= ca_cit_id INNER JOIN cost ON cc_cost_id = cost_id    WHERE sc_sea_id =$1 and hist_id=$2 and act_id=$3", [sea_id, hist_id, act_id]);
            let dbActCity = dbResult.rows;
            console.log(dbActCity)
            let activities = [];
            for (let act of dbActCity) {
                activities.push(act);
            }
            return { status: 200, result: activities };
        } catch (err) {
            console.log(err);
            return { status: 500, result: { msg: "Something went wrong." } };
        }
    }
}module.exports = Activity;



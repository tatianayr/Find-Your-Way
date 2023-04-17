const pool = require("../config/database");

function dbHistoryToHistory(hist){
    return new History(hist.ch_cit_id, hist.ch_hist_id);
}

class History{
    constructor(id, name){
        this.id=id;
        this.name=name;
    }
    export(){
        hist.id=this.id;
        hist.name=this.name;
        return new History();
    }

    static async getHistoryCity(hist_id){
        if (!hist_id) {
            return { status: 400, result: { msg: "Invalid season parameter." } };
        }
        try {
            let dbResult = await pool.query("select * from ch where ch_cit_id = $1", [hist_id]);
            let dbHistCity = dbResult.rows;
            console.log(dbHistCity)
            let history = [];
            for (let hist of dbHistCity) {
                // { id_estacao, id_cidade }
                history.push(dbHistoryToHistory(hist));
            }
            return { status: 200, result: history };
        } catch (err) {
            console.log(err);
            return { status: 500, result: { msg: "Something went wrong." } };
        }

    }

    static async getActivityByHistory(sea_id, hist_id) {
        /*
       SELECT * FROM history INNER JOIN ch ON hist_id = ch_hist_id INNER JOIN sc ON ch_cit_id = sc_cit_id WHERE sc_sea_id = 1;
        */
        if (!hist_id) {
            return { status: 400, result: { msg: "Invalid season parameter." } };
        }
        try {
            let dbResult = await pool.query("SELECT distinct act_name FROM history INNER JOIN ch ON hist_id = ch_hist_id INNER JOIN sc ON ch_cit_id = sc_cit_id INNER JOIN ca ON ca_cit_id= ch_cit_id INNER JOIN activity ON ca_act_id=act_id WHERE sc_sea_id = $1 and hist_id=$2", [sea_id, hist_id]);
            let dbHistCity = dbResult.rows;
            console.log(dbHistCity)
            let history = [];
            for (let hist of dbHistCity) {
                history.push(hist);
            }
            return { status: 200, result: history };
        } catch (err) {
            console.log(err);
            return { status: 500, result: { msg: "Something went wrong." } };
        }
    }
} module.exports = History;


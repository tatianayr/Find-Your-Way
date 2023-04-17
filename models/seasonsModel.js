const pool = require("../config/database");

function dbSeasonToSeason(ssn) {
    // { id_estacao, id_cidade }
    return new Season(ssn.sc_cit_id, ssn.sc_sea_id);

}

class Season {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    export() {
        sea.id = this.id;
        sea.name = this.name;
        return new Season();
    }

    static async getSeasonCity(sea_id) {
        if (!sea_id) {
            return { status: 400, result: { msg: "Invalid season parameter." } };
        }
        try {
            let dbResult = await pool.query("select * from sc where sc_sea_id = $1", [sea_id]);
            let dbSeaCity = dbResult.rows;
            console.log(dbSeaCity)
            let seasons = [];
            for (let ssn of dbSeaCity) {
                // { id_estacao, id_cidade }
                seasons.push(dbSeasonToSeason(ssn));
            }
            return { status: 200, result: seasons };
        } catch (err) {
            console.log(err);
            return { status: 500, result: { msg: "Something went wrong." } };
        }
    }

    static async getHistoryBySeason(sea_id) {
        /*
       SELECT * FROM history INNER JOIN ch ON hist_id = ch_hist_id INNER JOIN sc ON ch_cit_id = sc_cit_id WHERE sc_sea_id = 1;
        */
        if (!sea_id) {
            return { status: 400, result: { msg: "Invalid season parameter." } };
        }
        try {
            let dbResult = await pool.query("SELECT distinct hist_name FROM history INNER JOIN ch ON hist_id = ch_hist_id INNER JOIN sc ON ch_cit_id = sc_cit_id WHERE sc_sea_id = $1;", [sea_id]);
            let dbSeaCity = dbResult.rows;
            console.log(dbSeaCity)
            let seasons = [];
            for (let ssn of dbSeaCity) {
                // { id_estacao, id_cidade }
                seasons.push(ssn);
            }
            return { status: 200, result: seasons };
        } catch (err) {
            console.log(err);
            return { status: 500, result: { msg: "Something went wrong." } };
        }
    }
} module.exports = Season;
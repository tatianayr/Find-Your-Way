const pool = require("../config/database");

async function getCities(sea_id, hist_id, act_id, cost_name) {
  try {
    let dbResult = await pool.query(
      "SELECT cities.cit_name FROM history INNER JOIN ch ON hist_id = ch_hist_id INNER JOIN sc ON ch_cit_id = sc_cit_id INNER JOIN cities ON sc_cit_id = cities.cit_id INNER JOIN ca ON ca_cit_id = ch_cit_id INNER JOIN activity ON ca_act_id = act_id INNER JOIN cc ON cc_cit_id = ca_cit_id INNER JOIN cost ON cc_cost_id = cost_id WHERE sc_sea_id = $1 AND hist_id = $2 AND act_id = $3 AND cost_id = $4",
      [sea_id, hist_id, act_id, cost_name]
    );
    let cities = dbResult.rows.map((row) => row.cit_name);
    return { status: 200, result: cities };
  } catch (err) {
    console.log(err);
    return { status: 500, result: { msg: "Something went wrong." } };
  }
}

module.exports = { getCities };

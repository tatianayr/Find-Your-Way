const pool = require("../config/database");

function dbCostToCost(cost){
    return new Cost(cost.cc_cost_id,cost.cc_cit_id);
}

class Cost{
    constructor(id, name){
        this.id=id;
        this.name=name;
    }
    export(){
        cost.id=this.id;
        cost.name=this.name;
        return new Cost();
    }

}module.exports = Cost;
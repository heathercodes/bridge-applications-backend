const { Model } = require("objection");

class Cohorts extends Model {
  static get tableName() {
    return "cohorts";
  }
}

module.exports = Cohorts;

const { Model } = require("objection");

class IdentifyingInfo extends Model {
  static get tableName() {
    return "identifying_info";
  }

  static getInfoWithNames(names) {
    return IdentifyingInfo.query().whereIn("name", names);
  }

  static insertInfo(newInfo) {
    return IdentifyingInfo.query()
      .insert(newInfo)
      .returning('id');
  }
}

module.exports = IdentifyingInfo;

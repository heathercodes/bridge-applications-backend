const { Model } = require('objection');

class UserIdentifyingInfo extends Model {
  static get tableName() {
    return 'users_identifying_info';
  }
}

module.exports = UserIdentifyingInfo;

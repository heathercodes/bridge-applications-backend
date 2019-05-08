const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static getUsers() {
    return User.query()
      .eager("identifying_info");
  }

  static getUser(id) {
    return User.query()
      .where('users.id', id)
      .eager("identifying_info");
  }

  static insertUser({ first_name, last_name, email, employment_status, employer, pronouns }) {
    return User.query()
      .insert({ first_name, last_name, email, employment_status, employer, pronouns })
      .returning('*');
  }

  static get relationMappings() {
    const IdentifyingInfo = require("../identifying_info/identifyingInfo.model");
    const ApplicationsInfo = require("../applications/applications.model");

    return {
      identifying_info: {
        relation: Model.ManyToManyRelation,
        modelClass: IdentifyingInfo,
        join: {
          from: "users.id",
          through: {
            from: "users_identifying_info.user_id",
            to: "users_identifying_info.identifying_info_id"
          },
          to: "identifying_info.id"
        }
      },
      applications: {
        relation: Model.HasManyRelation,
        modelClass: ApplicationsInfo,
        join: {
          from: "users.id",
          to: "applications.user_id"
        }
      }
    };
  }
}

module.exports = User;

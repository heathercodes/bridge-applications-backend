const { Model } = require('objection');

class Applications extends Model {
  static get tableName() {
    return 'applications';
  }

  static insertApplication({
    cohort_id,
    user_id,
    accepted_test,
    accepted_cohort,
  }) {
    return Applications.query()
      .insert({
        cohort_id,
        user_id,
        accepted_test,
        accepted_cohort,
      })
      .returning('*');
  }

  static updateApplication(id, updatedInfo) {
    return Applications.query()
      .patchAndFetchById(id, updatedInfo)
      .returning('*');
  }

  static deleteApplication(id) {
    return Applications.query()
      .findById(id)
      .del();
  }

  static getApplication(id) {
    return Applications.query()
      .findById(id)
      .returning('*');
  }

  static get relationMappings() {
    const CohortInfo = require('../cohort/cohort.model');
    const UserInfo = require('../users/users.model');

    return {
      cohorts: {
        relation: Model.BelongsToOneRelation,
        modelClass: CohortInfo,
        join: {
          from: 'applications.cohort_id',
          to: 'cohort.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserInfo,
        join: {
          from: 'applications.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Applications;

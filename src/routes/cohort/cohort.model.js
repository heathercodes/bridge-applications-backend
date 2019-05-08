const { Model } = require("objection");

class Cohorts extends Model {
  static get tableName() {
    return "cohorts";
  }

  static insertCohort({ name, start_date, end_date, welcome_text, thank_you_text }) {
    return Cohorts.query()
      .insert({ name, start_date, end_date, welcome_text, thank_you_text })
      .returning('*')
  }

  static getCohort(id) {
    return Cohorts.query()
      .where('cohort.id', id)
      .returning('*');
  }

  static updateCohort(id, updatedInfo) {
    return Cohorts.query()
      .where('cohort.id', id)
      .patch(updatedInfo)
      .returning('*')
  }

  static deleteCohort(id) {
    return Cohorts.query()
      .where('cohort.id', id)
      .del()
  }

  static get relationMappings() {
    const ApplicationsInfo = require("../applications/applications.model");

    return {
      applications: {
        relation: Model.HasManyRelation,
        modelClass: ApplicationsInfo,
        join: {
          from: 'cohorts.id',
          to: 'application.cohort_id'
        }
      }
    }
  }
}

module.exports = Cohorts;

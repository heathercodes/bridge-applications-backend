const express = require('express');
const { check } = require('express-validator/check');
const database = require('../../db');

const applicationsController = require("./applications.controller");

const router = express.Router();

router.get("", applicationsController.list);
router.get("/:id", applicationsController.get);
router.post("", [
    check('cohort_id').exists(),
    check('cohort_id').custom((value) => {
      return database('cohorts').select('id').where({ id: value }).then((result) => {
        if (result.length === 0) {
          return Promise.reject('Cohort does not exist')
        }
      })
    }),
    check('user_id').exists(),
    check('user_id').custom((value) => {
      return database('users').select('id').where({ id: value }).then((result) => {
        if (result.length === 0) {
          return Promise.reject('User does not exist')
        }
      })
    }),
    check(['user_id', 'cohort_id']).custom((value) => {
      const [ user_id, cohort_id ] = value;

      return database('applications').select('id').where({ user_id, cohort_id }).then((result) => {
        if (result.length) {
          return Promise.reject('Looks like you\'ve already applied!');
        }
      })
    }),
    check('cohort_id').custom((value) => {
      return database("cohorts").select('start_date', 'end_date').where({
        id: value
      }).then((result) => {
        const { start_date, end_date } = result[0];
        const date = Date.now();
        if (date > start_date || date > end_date) {
          return Promise.reject('This cohort has already started or completed');
        }
      })
    })
], applicationsController.create);
router.put("/:id", applicationsController.update);
router.delete("/:id", applicationsController.del);

module.exports = {
  applicationsRouter: router
}

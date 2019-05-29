const { validationResult } = require('express-validator/check');
const Cohorts = require('./cohort.model');
const { NotFoundError } = require('../../utils/errors');

const list = async (req, res, next) => {
  try {
    const cohorts = await Cohorts.query();

    return res.json({ data: cohorts });
  } catch (err) {
    throw new NotFoundError('Unable to find cohorts');
  }
};

const get = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cohort = await Cohorts.getCohort(id);

    if (cohort.length === 0) {
      return res.status(404).json({
        error: 'Cohort not found',
      });
    }

    return res.json({
      data: cohort,
    });
  } catch (err) {
    throw new NotFoundError('Unable to find cohort');
  }
};

const create = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newCohort = await Cohorts.insertCohort(req.body);

    return res.json({
      data: newCohort,
    });
  } catch (err) {
    throw new NotFoundError('Unable to add cohort');
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const updatedInfo = req.body;

  try {
    const updatedCohort = await Cohorts.updateCohort(id, updatedInfo);

    return res.json({
      data: updatedCohort,
    });
  } catch (err) {
    throw new NotFoundError('Unable to update cohort');
  }
};

const del = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Cohorts.deleteCohort(id);

    return res.json({
      data: 'Successfully deleted',
    });
  } catch (err) {
    throw new NotFoundError('Error deleting cohort');
  }
};

module.exports = {
  list,
  get,
  create,
  update,
  del,
};

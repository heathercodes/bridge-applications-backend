const express = require('express');
const { check } = require('express-validator/check');
const { UnauthorizedError } = require('../../utils/errors');

const cohortsController = require('./cohort.controller');

const router = express.Router();

router.get('', (req, res, next) => {
  if (req.user.permissions.includes('read:cohorts')) {
    next();
  } else {
    next(new UnauthorizedError('NO! YOU CANT! WHO DO YOU THINK YOU ARE'));
  }
}, cohortsController.list);
router.get('/:id', cohortsController.get);
router.post('', [
  check('name', 'this cohort needs a name').isLength({ min: 2 }),
  check('start_date', 'this cohort needs a valid start date').exists(),
  check('end_date', 'this cohort needs a valid end date').exists(),
  check('welcome_text', 'please enter welcome text').isLength({ min: 10 }),
  check('thank_you_text', 'please enter thank you text').isLength({ min: 10 }),
], cohortsController.create);
router.put('/:id', cohortsController.update);
router.delete('/:id', cohortsController.del);

module.exports = {
  cohortsRouter: router,
};

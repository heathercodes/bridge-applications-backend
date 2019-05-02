const express = require('express');
const { check } = require('express-validator/check');

const cohortsController = require("./cohort.controller");

const router = express.Router();

router.get("", cohortsController.list);
router.get("/:id", cohortsController.get);
router.post("", [
    check('name', 'this cohort needs a name').isLength({min: 2}),
    check('start_date', 'this cohort needs a valid start date').exists(),
    check('end_date', 'this cohort needs a valid end date').exists(),
    check('welcome_text', 'please enter welcome text').isLength({min: 10}),
    check('thank_you_text', 'please enter thank you text').isLength({min: 10}),
], cohortsController.create);

module.exports = {
  cohortsRouter: router
}

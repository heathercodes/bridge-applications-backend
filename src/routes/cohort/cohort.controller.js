const { validationResult } = require('express-validator/check');
const Cohorts = require("./cohort.model");

const list = async (req, res, next) => {
    try {
        const cohorts = await Cohorts.query();

        return res.json({ data: cohorts });

    } catch(err) {
        next(err);
    }
};

const get = async (req, res, next) => {
    const { id } = req.params;

    try {
        const cohort = await Cohorts.query()
            .where('cohorts.id', id);

        if (cohort.length === 0) {
            return res.status(404).json({
                error: 'Cohort not found'
            })
        }

        return res.json({
            data: cohort
        });
    } catch(err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, start_date, end_date, welcome_text, thank_you_text } = req.body;

    try {
        const newCohort = await Cohorts.query()
            .insert({ name, start_date, end_date, welcome_text, thank_you_text })
            .returning('*');

        return res.json({
            data: newCohort
        });

    } catch(err) {
        next(err);
    }
}

module.exports = {
    list,
    get,
    create
}

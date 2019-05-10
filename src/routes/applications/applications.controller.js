const { validationResult } = require('express-validator/check');
const Applications = require("./applications.model");
const { NotFoundError } = require('../../utils/errors');

const list = async (req, res, next) => {
    try {
        const applications = await Applications.query();

        return res.json({ data: applications });

    } catch(err) {
        throw new NotFoundError("Unable to find applications");
    }
};

const get = async (req, res, next) => {
    const { id } = req.params;

    try {
        const application = await Applications.getApplication(id);

        if (application.length === 0) {
            return res.status(404).json({
                error: 'Application not found'
            })
        }

        return res.json({
            data: application
        });
    } catch(err) {
        throw new NotFoundError("Unable to find application");
    }
};

const create = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
        const newApplication = await Applications.insertApplication(req.body);

        return res.json({
            data: newApplication
        });

    } catch(err) {
        throw new NotFoundError("Unable to add application");
    }
}

const update = async (req, res, next) => {
    const { id } = req.params;
    const updatedInfo = req.body;

    try {
        const updatedApplication = await Applications.updateApplication(id, updatedInfo);

        return res.json({
            data: updatedApplication
        });

    } catch(err) {
        throw new NotFoundError("Unable to update application");
    }
}

const del = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Applications.deleteApplication(id);

        return res.json({
            data: 'Successfully deleted'
        });

    } catch(err) {
        throw new NotFoundError("Error in deleting application");
    }
}

module.exports = {
    list,
    get,
    create,
    update,
    del
}

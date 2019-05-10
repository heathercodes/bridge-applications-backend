const express = require('express');
const { check } = require('express-validator/check');
const database = require('../../db');
const restrictToAdmin = require('../../middleware/restrict-to-admin');
const usersController = require("./users.controller");

const router = express.Router();

router.get("", restrictToAdmin, usersController.list);
router.get("/:id", usersController.get);
router.post("", [
    check('first_name', 'first name must be at least 2 characters').isLength({min: 2}),
    check('last_name', 'last name must be at least 2 characters').isLength({min: 2}),
    check('email', 'email must be a formatted email').isEmail(),
    check('email').custom((value) => {
        return database('users').where({ email: value }).then((users) => {
            if (users.length) {
                return Promise.reject('Email must be unqiue')
            }
        });
    }),
    check('pronouns', 'pronouns must be present').exists(),
    check('employment_status').isIn([
        'full_time',
        'part_time',
        'in_school',
        'looking',
        'not_looking'
    ]),
    check('identifying_info').isArray(),
    check('role', 'please set user role').exists()
], usersController.create);
router.delete("/:id", usersController.del);

module.exports = {
  usersRouter: router
}

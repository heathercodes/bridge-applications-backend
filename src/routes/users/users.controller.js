const config = require('../../../knexfile');
const database = require('knex')(config);
const { validationResult } = require('express-validator/check');

const list = (req, res, next) => {
    database('users').select().then((users) => {
        return res.json({
            users
          });
    }).catch((err) => {
        next(err);
    })
};

const get = (req, res, next) => {
    const { id } = req.params;

    database('users')
        .join('users_identifying_info', 'users_identifying_info.user_id', '=', 'users.id')
        .join('identifying_info', 'users_identifying_info.identifying_info_id', '=', 'identifying_info.id')
        .where('users.id', id)
        .select('users.*', 'identifying_info.name as identifying_info')
        .then((users) => {
            if (users.length === 0) {
                return res.status(404).json({
                    error: 'User not found'
                })
            }
            return res.json({
                user: users[0],
                identifying_info: users.map((user) => user.identifying_info)
            });
        }).catch((err) => {
            next(err);
        })
};

const create = (req, res, next) => {
    console.log('I wrk');
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        console.log(errors);
        return res.status(422).json({ errors: errors.array() })
    }

    const { first_name, last_name, email, pronouns, employment_status } = req.body;

    return database('users')
        .insert({ first_name, last_name, email, pronouns, employment_status })
        .returning('*')
        .then((users) => {
            database('identifying_info')
                .select()
                .whereIn('name', identifying_info.map((i) => i.name))
                .then((existing) => {
                    if (existing.length) {
                        database('users_identifying_info')
                            .insert(existing.map((info) => {
                                return {
                                    user_id: users[0].id,
                                    identifying_info_id: info.id
                                }
                            }))
                            .then(() => {
                                if (existing.length === identifying_info.length) {
                                    return res.json({
                                        user: {
                                            ...users[0],
                                            identifying_info: existing
                                        }
                                    })
                                }

                                const new_infos = identifying_info.filter(() => existing.find((i) => i.name === info.name));

                                database('identifying_info')
                                    .insert(new_infos)
                                    .returning('id')
                                    .then((new_infos) => {
                                        return database('users_identifying_info')
                                            .insert(new_infos.map((info) => {
                                                return {
                                                    user_id: users[0].id,
                                                    identifying_info_id: info.id
                                                }
                                        }))
                                });

                                return res.json({
                                    user: {
                                        ...users[0]
                                    }
                                })
                            })
                        }
                    })
        }).catch((err) => next(err))
};

module.exports = {
    list,
    get,
    create
}

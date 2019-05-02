const { validationResult } = require('express-validator/check');
const User = require("./users.model");
const IdentifyingInfo = require('../identifying_info/identifyingInfo.model');
const UserIdentifyingInfo = require('../identifying_info/userIdentifyingInfo.model');

const list = async (req, res, next) => {
    try {
        const users = await User.query()
            .eager("identifying_info");

        return res.json({ data: users });

    } catch(err) {
        next(err);
    }
};

const get = async (req, res, next) => {
    const { id } = req.params;

    try {
        const users = await User.query()
            .where('users.id', id)
            .eager("identifying_info");

        if (users.length === 0) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        return res.json({
            user: users[0],
            identifying_info: users.map((user) => user.identifying_info)
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

    const { first_name, last_name, email, employment_status, employer, pronouns, identifying_info } = req.body;

    try {
        const users = await User.query()
            .insert({ first_name, last_name, email, employment_status, employer, pronouns })
            .returning('*');

        users.identifying_info = identifying_info;

        if (identifying_info.length) {
            const existingInfo = await IdentifyingInfo.query()
                .select()
                .whereIn('name', identifying_info.map((i) => i.name ));

            let info;

            if (existingInfo.length === identifying_info.length) {
                info = existingInfo.map((i) => i.id);
            }

            const newInfo = identifying_info
                .filter((info) => !existingInfo.find((i) => i.name === info.name))
                .map((i) => ({ name: i.name, is_gender: i.is_gender, is_user_generated: i.is_user_generated || false }));

            info = await IdentifyingInfo.query()
                .insert(newInfo)
                .returning('id');

            await UserIdentifyingInfo.query()
                .insert(info.map(({id}) => ({ identifying_info_id: id, user_id: users.id })));
        }

        return res.json(users)

    } catch(err) {
        next(err);
    }
  }
  

module.exports = {
    list,
    get,
    create
}

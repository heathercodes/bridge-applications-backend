const { validationResult } = require('express-validator/check');
const User = require('./users.model');
const IdentifyingInfo = require('../identifying_info/identifyingInfo.model');
const UserIdentifyingInfo = require('../identifying_info/userIdentifyingInfo.model');
const { NotFoundError } = require('../../utils/errors');

const list = async (req, res, next) => {
  try {
    const users = await User.getUsers();

    return res.json({ data: users });
  } catch (err) {
    throw new NotFoundError('Unable to find users');
  }
};

const get = async (req, res, next) => {
  const { id } = req.params;

  try {
    const users = await User.getUser(id);

    if (users.length === 0) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.json({
      user: users[0],
      identifying_info: users.map(user => user.identifying_info),
    });
  } catch (err) {
    throw new NotFoundError('Unable to find user');
  }
};

const create = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { identifying_info } = req.body;

  try {
    const users = await User.insertUser(req.body);

    const combinedInfo = {
      ...users.identifying_info,
      ...identifying_info,
    };

    if (combinedInfo.length) {
      const names = combinedInfo.map(i => i.name);
      const existingInfo = await IdentifyingInfo.getInfoWithNames(names);

      let info;

      if (existingInfo.length === combinedInfo.length) {
        info = existingInfo.map(i => i.id);
      }

      const newInfo = identifying_info
        .filter(info => !existingInfo.find(i => i.name === info.name))
        .map(i => ({ name: i.name, is_gender: i.is_gender, is_user_generated: i.is_user_generated || false }));

      info = await IdentifyingInfo.insertInfo(newInfo);

      await UserIdentifyingInfo.query()
        .insert(info.map(({ id }) => ({ identifying_info_id: id, user_id: users.id })));
    }

    return res.json(users);
  } catch (err) {
    throw new NotFoundError('Cannot add user');
  }
};

const del = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.query()
      .where('users.id', id)
      .del();
  } catch (err) {
    throw new NotFoundError('Error deleting user:');
  }
};

const update = async () => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await User.query()
      .where('users.id', id)
      .eager('identifying_info')
      .patch(updatedData)
      .returning('*');

    return res.json({
      data: updatedUser,
    });
  } catch (err) {
    throw new NotFoundError('Cannot update user');
  }
};

module.exports = {
  list,
  get,
  create,
  del,
};

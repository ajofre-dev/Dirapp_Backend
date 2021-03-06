/* eslint-disable no-underscore-dangle */
const { Users } = require('../models');

module.exports = {
  create: (body) => {

    const newUser = new Users(body);
    return newUser.save();
  },
  findAll: () => Users.find({ is_active: true }),
  findOneByName: (first_name) => Users.find({ first_name }),
  findOneByEmail: (email) => Users.findOne({ email }),
  findOneById: (id) => Users.findById(id),
};

/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const { UsersSchema } = require('./Users');

const CompanysSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone_number: {
    type: Number,
    require: true,
  },
  adress: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  employee: [UsersSchema],
});

CompanysSchema.pre('save', function (next) {
  const company = this;
  // only hash the password if it has been modified (or is new)
  if (!company.isModified('password')) return next();
  // generate a salt
  // eslint-disable-next-line consistent-return
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(company.password, salt, (errHash, hash) => {
      if (errHash) return next(errHash);
      // override the cleartext password with the hashed one
      company.password = hash;
      return next();
    });
  });
});

const Companys = mongoose.model('Companys', CompanysSchema);

module.exports = Companys;

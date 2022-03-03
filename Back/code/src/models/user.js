/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('../utils/middleware/jwt');

const schema = new mongoose.Schema(
  {
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    token: {
      type: String,
      default: '',
    },
    active: {
      required: true,
      type: Boolean,
      default: false,
    },
    deleted: {
      required: true,
      type: Boolean,
      default: false,
    },
    role_uuid: {
      required: true,
      type: String,
    },
    failed_logins: {
      type: Number,
      default: 0,
      max: 5,
    },
    password_history_uuid: {
      type: String,
      default: '',
    },
    priority: {
      type: Number,
      // required: true,
    },
    blocked: {
      required: true,
      type: Boolean,
      default: false,
    },
    lopd_uuid: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret._id;
      },
    },
  },
);

schema.methods.validPassword = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};
schema.methods.toAuthJSON = function () {
  const user = this.toJSON();
  user.token = jwt.generateJWT({
    uuid: user.uuid,
    type: 'user',
  });
  delete user.password;
  return user;
};

schema.pre('save', function (next) {
  const user = this;
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  return next();
});

schema.pre('findOneAndUpdate', function (next) {
  const updatedParams = this._update;

  if (updatedParams.password) {
    updatedParams.password = bcrypt.hashSync(updatedParams.password, bcrypt.genSaltSync(10));
  }

  return next();
});

module.exports = schema;

const joi = require('joi');
const { validate } = require('express-validation');

const createUser = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().min(3).max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const createManagerUser = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().alphanum().min(3).max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);
const putUser = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().min(3).max(30),
      email: joi.string().email(),
      password: joi.string(),
      lopdUuid: joi.string().uuid(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const deleteUser = validate(
  {
    body: joi.object({}),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const activateUser = validate(
  {
    body: joi.object({}),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const unlockUser = validate(
  {
    body: joi.object({}),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const loginUser = validate(
  {
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const emailRecoveryUser = validate(
  {
    body: joi.object({
      email: joi.string().email().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const recoveryUser = validate(
  {
    body: joi.object({
      password: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const createLopdUser = validate(
  {
    body: joi
      .object({
        fileName: joi.string().required(),
        mediaType: joi.string().required(),
        uri: joi.string().base64().required(),
      })
      .unknown(false),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

module.exports = {
  createUser,
  createManagerUser,
  putUser,
  deleteUser,
  activateUser,
  loginUser,
  emailRecoveryUser,
  recoveryUser,
  unlockUser,
  createLopdUser,
};

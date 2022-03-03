const joi = require('joi');
const { validate } = require('express-validation');

const createMedia = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      URI: joi
        .string()
        .regex(/^data:(image|application)\/([a-zA-Z]+);base64,([^\"]*)$/)
        .required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

module.exports = {
  createMedia,
};

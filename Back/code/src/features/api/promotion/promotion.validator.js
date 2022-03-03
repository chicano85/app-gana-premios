/* eslint-disable newline-per-chained-call */
const joi = require('joi');
const { validate } = require('express-validation');

const createPromotion = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      promotionImageUrl: joi.string().required(),
      prizeImageUrl: joi.string().required(),
      prizeTitle: joi.string().min(20).max(250).required(),
      prizeDescription: joi.string().min(20).max(500).required(),
      campaignUuid: joi.string().uuid(),
      startDate: joi.date().required(),
      endDate: joi.date().greater(joi.ref('startDate')).required(),
      participationRules: joi.string().max(50000).required(),
      maxNumberParticipants: joi.number().integer().min(1),
      type: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const putPromotion = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      promotionImageUrl: joi.string().required(),
      prizeImageUrl: joi.string().required(),
      prizeTitle: joi.string().min(20).max(250).required(),
      prizeDescription: joi.string().min(20).max(500).required(),
      campaignUuid: joi.string().uuid(),
      startDate: joi.date().required(),
      endDate: joi.date().greater(joi.ref('startDate')).required(),
      participationRules: joi.string().required(),
      maxNumberParticipants: joi.number().integer().min(1),
      type: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const deletePromotion = validate(
  {
    body: joi.object({}),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const activatePromotion = validate(
  {
    body: joi.object({}),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

module.exports = {
  createPromotion,
  putPromotion,
  deletePromotion,
  activatePromotion,
};

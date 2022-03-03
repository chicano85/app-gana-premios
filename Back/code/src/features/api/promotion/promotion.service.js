const { v4: uuidv4 } = require('uuid');
const { Promotion } = require('../../../models/index');

const DRAFT = 0;
const PUBLISHED = 1;
const FINISHED = 2;
const DESERTED = 3;

const toPublic = (promotion) => promotion.toJSON();

const getPromotions = async (filters) => Promotion.find({ ...filters });

const getPaginatedPromotions =  async (filters, options) => {
  const offset = options.page * options.limit - options.limit;

  return Promotion.find({ ...filters })
    .skip(offset)
    .limit(options.limit);
};

const countAllPromotions = async () => Promotion.countDocuments();

const countPromotionsInsideCampaign = async (campaignUuid) => {
  return Promotion.countDocuments({ campaign_uuid: campaignUuid })
};

const getPromotion = async (uuid) => Promotion.findOne({ uuid });

const createPromotion = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };
  return Promotion.create(dataToCreate);
};

const putPromotion = async (uuid, data) =>
  Promotion.findOneAndUpdate({ uuid }, { $set: data }, { new: true });

const deletePromotion = async (promotion) => promotion.remove();

module.exports = {
  toPublic,
  getPromotions,
  getPaginatedPromotions,
  getPromotion,
  createPromotion,
  putPromotion,
  deletePromotion,
  countAllPromotions,
  countPromotionsInsideCampaign,
  DRAFT,
  PUBLISHED,
  FINISHED,
  DESERTED,
};

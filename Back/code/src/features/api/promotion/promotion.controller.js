/* eslint-disable import/no-unresolved */
const boom = require('@hapi/boom');
const logger = require('../../../config/winston');
const promotionFilters = require('./promotion.filters');
const promotionService = require('./promotion.service');
const campaignService = require('../campaign/campaign.service');
const queryOptions = require('../../../utils/queryOptions');

const listPromotions = async (req, res, next) => {
  const filters = promotionFilters(req.query);
  const options = queryOptions(req.query);
  let promotions;
  let totalDocuments;
  console.log(filters);

  try {
    promotions = await promotionService.getPaginatedPromotions(filters, options);
    totalDocuments = filters.campaign_uuid
      ? await promotionService.countPromotionsInsideCampaign(filters.campaign_uuid)
      : await promotionService.countAllPromotions();
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  const response = {
    data: promotions,
    page: options.page || 1,
    perPage: options.limit || -1,
    totalItems: totalDocuments,
    totalPages: options.limit ? Math.ceil(totalDocuments / options.limit) : 1,
  };

  return res.json(response);
};

const getCampaignPromotions = async (req, res, next) => {
  const { campaign } = res.locals;
  const filters = promotionFilters(req.query, campaign.uuid);
  const options = queryOptions(req.query);
  let promotions;
  let totalDocuments;

  try {
    promotions = await promotionService.getPaginatedPromotions(filters, options);
    totalDocuments = await promotionService.countPromotionsInsideCampaign(campaign.uuid);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  const response = {
    data: promotions,
    page: options.page || 1,
    perPage: options.limit || -1,
    totalItems: promotions.length,
    totalPages: options.limit ? Math.ceil(totalDocuments / options.limit) : 1,
  };

  return res.json(response);
};

const getPromotion = async (req, res, next) => {
  const { promotionUuid } = req.params;

  try {
    const promotion = await promotionService.getPromotion(promotionUuid);
    console.log(promotion);
    if (promotionUuid) {
      return res.json(promotion);
    }
    res.json(await promotionService.getPromotion(req.promotion));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const createPromotion = async (req, res, next) => {
  const {
    promotionImageUrl,
    prizeImageUrl,
    prizeTitle,
    prizeDescription,
    campaignUuid,
    startDate,
    endDate,
    participationRules,
    maxNumberParticipants,
    type,
  } = req.body;

  let promotion;

  const promotionData = {
    promotion_image_url: promotionImageUrl,
    prize_image_url: prizeImageUrl,
    prize_title: prizeTitle,
    prize_description: prizeDescription,
    campaign_uuid: campaignUuid,
    start_date: startDate,
    end_date: endDate,
    participation_rules: participationRules,
    max_number_participants: maxNumberParticipants,
    type,
  };

  try {
    promotion = await promotionService.createPromotion(promotionData);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.status(201).json(promotionService.toPublic(promotion));
};

const updatePromotion = async (req, res, next) => {
  const {
    promotionImageUrl,
    prizeImageUrl,
    prizeTitle,
    prizeDescription,
    campaignUuid,
    startDate,
    endDate,
    participationRules,
    maxNumberParticipants,
    type,
  } = req.body;

  let response;
  let promotion;

  if (res.locals && res.locals.promotion) {
    promotion = res.locals.promotion;
  }

  const promotionData = {
    promotion_image_url: promotionImageUrl,
    prize_image_url: prizeImageUrl,
    prize_title: prizeTitle,
    prize_description: prizeDescription,
    campaign_uuid: campaignUuid,
    start_date: startDate,
    end_date: endDate,
    participation_rules: participationRules,
    max_number_participants: maxNumberParticipants,
    type,
    uuid: promotion.uuid,
    active: promotion.active,
    deleted: promotion.deleted,
    status: promotion.status,
    promotion_history_uuid: promotion.promotion_history_uuid,
    uuid_participants: promotion.uuid_participants,
    additional_information: promotion.additional_information,
  };

  try {
    response = await promotionService.putPromotion(promotion.uuid, promotionData);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.json(promotionService.toPublic(response));
};

const deletePromotion = async (req, res, next) => {
  const { promotion } = res.locals;

  try {
    await promotionService.deletePromotion(promotion);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  res.status(200).json({});
};

module.exports = {
  listPromotions,
  getPromotion,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getCampaignPromotions,
};

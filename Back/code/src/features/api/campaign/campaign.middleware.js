const boom = require('@hapi/boom');
const { getTranslation } = require('../../../utils/getTranslation');
const service = require('./campaign.service');

async function loadCampaign(req, res, next) {
  const { campaignUuid } = req.params;
  console.log(campaignUuid);
  let campaign;

  if (!campaignUuid) {
    return next(boom.badData(getTranslation('campaignIdRequired')));
  }

  try {
    campaign = await service.getCampaign(campaignUuid);
  } catch (error) {
    return next(boom.notFound(getTranslation('campaignNotFound')));
  }

  if (!campaign) {
    return next(boom.notFound(getTranslation('campaignNotFound')));
  }

  res.locals.campaign = await service.toPublic(campaign);
  next();
}

module.exports = {
  loadCampaign,
};

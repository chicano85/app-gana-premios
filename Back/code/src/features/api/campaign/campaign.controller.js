const boom = require('@hapi/boom');
const logger = require('../../../config/winston');
const campaignFilters = require('./campaign.filters');
const campaignService = require('./campaign.service');
const clientService = require('../client/client.service');
const { ALL, MANAGER_RESOURCES } = require('../user/user.service');
const queryOptions = require('../../../utils/queryOptions');
const { getTranslation } = require('../../../utils/getTranslation');

const create = async (req, res, next) => {
  const { user } = req;
  const managerUuid = user.priority === MANAGER_RESOURCES ? user.uuid : req.body.managerUuid;
  const { name, clientUuid, startDate, endDate } = req.body;
  let client;

  try {
    client = await clientService.getClient(clientUuid);

    if (!client) {
      return next(boom.badData(getTranslation('clientNonExist', user.language)));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  let campaign;
  const campaignData = {
    name,
    client_uuid: clientUuid,
    manager_uuid: managerUuid,
    start_date: startDate,
    end_date: endDate,
  };

  try {
    campaign = await campaignService.createCampaign(campaignData);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.status(201).json(campaignService.toPublic(campaign));
};

const listCampaings = async (req, res, next) => {
  const { user } = req;
  let filters;
  const options = queryOptions(req.query);
  const listCampaigns = [];
  let campaings;
  let totalDocuments;

  try {
    if (user.priority === ALL) {
      filters = campaignFilters(req.query);
      totalDocuments = await campaignService.countAllDocuments();
    } else {
      filters = campaignFilters(req.query, user.uuid);
      totalDocuments = await campaignService.countManagerDocuments(user.uuid);
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    campaings = await campaignService.getPaginatedCampaigns(filters, options);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const campaign of campaings) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const client = await clientService.getClient(campaign.client_uuid);
      // eslint-disable-next-line no-await-in-loop
      const campaignPublic = await campaignService.toPublic(campaign);
      if (!client) {
        logger.error('El cliente no existe');
        listCampaigns.push({ ...campaignPublic });
      } else {
        listCampaigns.push({ ...campaignPublic, client });
      }
    } catch (error) {
      logger.error(`${error}`);
      return next(boom.badImplementation(error.message));
    }
  }

  const response = {
    data: listCampaigns,
    page: options.page || 1,
    perPage: options.limit || -1,
    totalItems: totalDocuments,
    totalPages: options.limit ? Math.ceil(totalDocuments / options.limit) : 1,
  };

  return res.json(response);
};

const getCampaing = async (req, res, next) => {
  const { campaign } = res.locals;
  let client;
  let newCampaign;
  const { user } = req;

  if (user.priority === MANAGER_RESOURCES && user.uuid !== campaign.manager_uuid) {
    return next(boom.unauthorized(getTranslation('noManagerGetCampaign', user.language)));
  }

  try {
    client = await clientService.getClient(campaign.client_uuid);

    if (!client) {
      return next(boom.badData(getTranslation('clientNonExist', user.language)));
    }

    newCampaign = {
      ...campaign,
      client,
    };
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    return res.json(newCampaign);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const updateCampaign = async (req, res, next) => {
  const { campaign } = res.locals;
  const { name, clientUuid, startDate, endDate, active } = req.body;
  let client;

  if (campaign.client_uuid !== clientUuid) {
    try {
      client = await clientService.getClient(clientUuid);

      if (!client) {
        return next(boom.badData(getTranslation('clientNonExist2')));
      }
    } catch (error) {
      logger.error(`${error}`);
      return next(boom.badImplementation(error.message));
    }
  }

  const campaignData = {
    name,
    start_date: startDate,
    end_date: endDate,
    // eslint-disable-next-line no-bitwise
    client_uuid: client ? client.uuid : campaign.client_uuid,
    uuid: campaign.uuid,
    manager_uuid: campaign.manager_uuid,
    active,
    deleted: campaign.deleted,
  };
  let response;

  try {
    response = await campaignService.putCampaign(campaign.uuid, campaignData);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.json(campaignService.toPublic(response));
};

module.exports = {
  create,
  listCampaings,
  getCampaing,
  updateCampaign,
};

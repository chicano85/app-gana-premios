const { v4: uuidv4 } = require('uuid');
const { Campaign } = require('../../../models/index');

const toPublic = (campaign) => campaign.toJSON();

const createCampaign = async (data) => {
  const dataToCreate = {
    ...data,
    uuid: uuidv4(),
  };
  return Campaign.create(dataToCreate);
};

const getPaginatedCampaigns = async (filters, options) => {
  const offset = options.page * options.limit - options.limit;

  return Campaign.find({ ...filters })
    .skip(offset)
    .limit(options.limit);
};

const countManagerDocuments = async (managerUuid) =>
  Campaign.countDocuments({ manager_uuid: managerUuid });

const countAllDocuments = async () => Campaign.countDocuments();

const getCampaign = (uuid) => Campaign.findOne({ uuid });

const putCampaign = async (uuid, data) =>
  Campaign.findOneAndUpdate({ uuid }, { $set: data }, { new: true });

module.exports = {
  toPublic,
  createCampaign,
  getPaginatedCampaigns,
  getCampaign,
  putCampaign,
  countManagerDocuments,
  countAllDocuments,
};

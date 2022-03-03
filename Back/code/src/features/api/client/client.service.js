/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require('uuid');

const { Client } = require('../../../models/index');

// const logger = require('../../../config/winston');

const toPublic = (client) => client.toJSON();

const getClients = async (filters, options) =>
  Client.find({ where: filters, client: options.client });

const getPaginatedClients = async (filters, options) => {
  const offset = options.page * options.limit - options.limit;

  return Client.find({ ...filters })
    .skip(offset)
    .limit(options.limit);
};

const countDocuments = async () => Client.countDocuments();

const getClient = async (uuid) => Client.findOne({ uuid });

const createClient = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };
  return Client.create(dataToCreate);
};
const putClient = async (uuid, data) => Client.findOneAndUpdate({ uuid }, data, { new: true });

const deleteClient = async (client) => client.remove();

module.exports = {
  toPublic,
  getClients,
  getPaginatedClients,
  getClient,
  createClient,
  putClient,
  deleteClient,
  countDocuments,
};

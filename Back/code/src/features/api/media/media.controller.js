/* eslint-disable import/no-unresolved */
const boom = require('@hapi/boom');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const logger = require('../../../config/winston');
const mediaService = require('./media.service');

const createMedia = async (req, res, next) => {
  let path = '/app/src/private';
  const { URI } = req.body;
  const [metaData, base64Data] = URI.split(',');
  const [type] = metaData.split('/')[1].split(';');
  let media;

  if (!base64Data) {
    return next(boom.badData('No existe el fichero'));
  }

  const uuid = uuidv4();
  if (type === 'pdf') {
    path += `/pdfs/${Date.now()}_${uuid},.pdf`;
  } else {
    path += `/images/${Date.now()}_${uuid}.${type}`;
  }

  try {
    fs.writeFileSync(path, base64Data, { encoding: 'base64' });
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  const mediaToCreate = {
    path,
    url: `${process.env.BASE_URL}/medias/${uuid}`,
    uuid,
  };

  try {
    media = await mediaService.createMedia(mediaToCreate);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  return res.status(201).json(media);
};

const getMedia = async (req, res, next) => {
  const { media } = res.locals;

  try {
    const base64Data = fs.readFileSync(media.path, { encoding: 'base64' });
    return res.json({ base64Data });
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

module.exports = {
  // listClients,
  // getClient,
  createMedia,
  getMedia,
};

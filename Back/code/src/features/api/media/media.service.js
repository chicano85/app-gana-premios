const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { Media } = require('../../../models/index');
const fileUploader = require('../../../utils/fileUploader');
const config = require('../../../config');

const toPublic = (media) => media.toJSON();

const createMedia = async (fileName, mediaType, uri) => {
  const uuid = uuidv4();

  const fileNameArray = fileName.split('.');

  if (!Array.isArray(fileNameArray) || fileNameArray.length < 2) {
    throw new Error('El nombre del fichero no es válido');
  }

  const extension = fileNameArray[1];

  const dataToCreate = {
    media_type: mediaType,
    original_file_name: fileName,
    uuid,
    file_name: `${uuid}.${extension}`,
    extension: fileNameArray[1],
  };

  const savedFile = await fileUploader.uploadFile(uri, uuid, extension);

  if (!savedFile) {
    throw new Error('No se ha guardado el archivo correctamente');
  }

  return Media.create(dataToCreate);
};

const getMedia = async (uuid) => Media.findOne({ uuid });

const getMediaUri = async (media) => fileUploader.getFile(media.uuid, media.extension);

const getMediaPath = async (media) =>
  path.join(__dirname, '../..', config.mediaStorageFolder, `${media.uuid}.${media.extension}`);

const deleteMedia = async (uuid) => Media.deleteOne({ uuid });

module.exports = {
  toPublic,
  createMedia,
  getMedia,
  getMediaUri,
  getMediaPath,
  deleteMedia,
};

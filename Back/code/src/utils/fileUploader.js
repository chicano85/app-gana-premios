const fs = require('fs');
const path = require('path');
const config = require('../config');
const logger = require('../config/winston');

const uploadFile = async (base64Data, mediaUuid, mediaExt) => {
  const route = path.join(__dirname, config.mediaStorageFolder, `${mediaUuid}.${mediaExt}`);

  try {
    const file = fs.openSync(route, 'w+');
    fs.writeFileSync(file, base64Data, { encoding: 'base64' });
    fs.closeSync(file);
  } catch (error) {
    logger.error(`${error}`);
    return false;
  }
  return true;
};

const getFile = (mediaUuid, mediaExt) => {
  const route = path.join(__dirname, config.mediaStorageFolder, `${mediaUuid}.${mediaExt}`);
  let base64Data;

  try {
    const file = fs.openSync(route, 'r');
    base64Data = fs.readFileSync(file, { encoding: 'base64' });
    fs.closeSync(file);
  } catch (error) {
    logger.error(`${error}`);
  }

  return base64Data;
};

module.exports = {
  uploadFile,
  getFile,
};

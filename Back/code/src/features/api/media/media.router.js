const express = require('express');

const router = express.Router();

const authorization = require('../../../utils/middleware/authorization');
const mediaController = require('./media.controller');
const middleware = require('./media.middleware');
const validator = require('./media.validator');

// Descargar media
router.get(
  '/:mediaUuid',
  authorization('media:view'),
  middleware.loadMedia,
  mediaController.getMedia,
);

// Subir media
router.post('/', authorization('media:create'), validator.createMedia, mediaController.createMedia);

module.exports = router;

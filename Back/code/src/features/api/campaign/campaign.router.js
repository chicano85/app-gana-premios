const express = require('express');

const router = express.Router();
const authorization = require('../../../utils/middleware/authorization');
const campaignController = require('./campaign.controller');
const middleware = require('./campaign.middleware');
const validator = require('./campaign.validator');

// Listar campañas del gestor
router.get('/', authorization('campaigns:view'), campaignController.listCampaings);

// Crear una campaña
router.post(
  '/',
  authorization('campaigns:create'),
  validator.createCampaign,
  campaignController.create,
);

// Obtener una campaña
router.get(
  '/:campaignUuid',
  authorization('campaigns:view'),
  middleware.loadCampaign,
  campaignController.getCampaing,
);

// Editar una campaña
router.put(
  '/:campaignUuid',
  authorization('campaigns:update'),
  validator.putCampaign,
  middleware.loadCampaign,
  campaignController.updateCampaign,
);

module.exports = router;

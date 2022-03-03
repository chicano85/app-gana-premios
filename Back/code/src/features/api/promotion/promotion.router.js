const express = require('express');

const router = express.Router();
const promotionController = require('./promotion.controller');
const authorization = require('../../../utils/middleware/authorization');
const middleware = require('./promotion.middleware');
const campaignMiddleware = require('../campaign/campaign.middleware');
const validator = require('./promotion.validator');

// Ver una promoción
router.get(
  '/:promotionUuid',
  authorization('promotions:view'),
  middleware.loadPromotion,
  promotionController.getPromotion,
);

// Crear una promoción
router.post(
  '/',
  authorization('promotions:create'),
  validator.createPromotion,
  middleware.checkCampaignRequirements,
  promotionController.createPromotion,
);

// Listar las promociones para el admin paginadas
router.get('/', authorization('ADMIN'), promotionController.listPromotions);

// Listar las promociones paginadas
router.get('/campaign/:campaignUuid', authorization('promotions:view'), campaignMiddleware.loadCampaign, promotionController.getCampaignPromotions);

// Editar una promoción
router.put(
  '/:promotionUuid',
  authorization('promotions:update'),
  validator.putPromotion,
  middleware.loadPromotion,
  promotionController.updatePromotion,
);

// Borrar una promoción
router.delete(
  '/:promotionUuid',
  authorization('promotions:delete'),
  // validator.deletePromotion,
  middleware.loadPromotion,
  promotionController.deletePromotion,
);

module.exports = router;

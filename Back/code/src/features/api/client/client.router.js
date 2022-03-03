const express = require('express');

const router = express.Router();

const authorization = require('../../../utils/middleware/authorization');
const clientController = require('./client.controller');
const middleware = require('./client.middleware');
const validator = require('./client.validator');

// Ver un cliente
router.get(
  '/:clientUuid',
  authorization('clients:view'),
  middleware.loadClient,
  clientController.getClient,
);

// Listar los clientes paginados
router.get('/', authorization('clients:view'), clientController.listClients);

// Crear un cliente
router.post(
  '/',
  authorization('clients:create'),
  validator.createClient,
  clientController.createClient,
);

// Editar un cliente
router.put(
  '/:clientUuid',
  authorization('clients:update'),
  validator.putClient,
  middleware.loadClient,
  clientController.putClient,
);

// Borrar un cliente
router.delete(
  '/:clientUuid',
  authorization('clients:delete'),
  validator.deleteClient,
  middleware.loadClient,
  clientController.deleteClient,
);

module.exports = router;

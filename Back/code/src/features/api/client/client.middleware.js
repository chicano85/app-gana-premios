const boom = require('@hapi/boom');
const service = require('./client.service');

async function loadClient(req, res, next) {
  const { clientUuid } = req.params;
  let client;

  if (!clientUuid) {
    return next(boom.badData('El identificador es obligatorio'));
  }

  try {
    client = await service.getClient(clientUuid);
  } catch (error) {
    return next(boom.notFound('Cliente no encontrado'));
  }

  if (!client) return next(boom.notFound('Cliente no encontrado'));
  res.locals.client = client;

  next();
}

module.exports = {
  loadClient,
};

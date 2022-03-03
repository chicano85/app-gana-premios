const boom = require('@hapi/boom');
const service = require('./media.service');

async function loadMedia(req, res, next) {
  const { mediaUuid } = req.params;
  let media;

  if (!mediaUuid) {
    return next(boom.badData('El identificador de media es obligatorio'));
  }

  try {
    media = await service.getMedia(mediaUuid);
  } catch (error) {
    return next(boom.badImplementation(error.message));
  }

  if (!media) {
    return next(boom.notFound('Media no encontrado'));
  }

  res.locals.media = media;
  next();
}

module.exports = {
  loadMedia,
};

const boom = require('@hapi/boom');
const userService = require('../user/user.service');
const logger = require('../../../config/winston');
const { validatePasswordPattern } = require('../../../utils/passwordValidator');
const { PARTICIPANTS_RESOURCES } = require('../user/user.service');
const userGroupService = require('../userGroup/userGroup.service');
// const { activateUser } = require('../user/user.validator');
// const jwt = require('../../../utils/middleware/jwt');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await userService.getUserByEmail(email);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
  /* if (user.active !== true) {
    return next(
      boom.unauthorized('Tu usuario no está activo. Por favor, revisa tu correo electrónico'),
    );
  } */

  if (!user) {
    return next(boom.unauthorized(res.__('errorMailPassword')));
  }

  if (user.blocked) {
    return next(boom.unauthorized(res.__('unlockedAccountcheckMail')));
  }

  try {
    if (user.failed_logins >= 5) {
      await userService.blockAccount(user);
      return next(boom.unauthorized(res.__('lockedAccount')));
    }
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation(error.message));
  }
  try {
    const userHasValidPassword = await user.validPassword(password);

    if (!userHasValidPassword) {
      await userService.incrementLoginAttempts(user._id);
      return next(boom.unauthorized(res.__('invalidPassword')));
    }

    if (user.failed_logins > 0) {
      await userService.resetLoginAttempts(user._id);
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badRequest(error.message));
  }

  let response;

  try {
    response = await user.toAuthJSON();
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badRequest(error.message));
  }

  return res.json(response);
};

const unBlockAccount = async (req, res, next) => {
  const { token } = req.params;
  let unBlockedUser;
  let user;

  try {
    if (token !== '') {
      user = await userService.getUserByToken(token);
    }

    if (!user) {
      return next(boom.unauthorized(res.__('invalidUser')));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    unBlockedUser = await userService.unBlockAccount(user._id);
    console.log(unBlockedUser);

    if (unBlockedUser) {
      return res.status(204).json();
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const register = async (req, res, next) => {
  const language = req.headers['accept-language'];
  const userData = req.body;
  let user;

  const isValidPassword = validatePasswordPattern(userData.email, userData.password);

  if (!isValidPassword.status) {
    const errorResponse = {
      statusCode: 422,
      message: res.__('invalidPassword2'),
      errors: isValidPassword.errors,
    };
    return res.status(422).json(errorResponse);
  }

  try {
    const searchRole = await userGroupService.getRoleByName('Participants');

    user = await userService.createUser({
      ...userData,
      role_uuid: searchRole.uuid,
      priority: PARTICIPANTS_RESOURCES,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const dupField = Object.keys(error.keyValue)[0];
      return next(boom.badData(`Ya existe un usuario con ese ${dupField} introducido`));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  try {
    await userService.activateAccount(user, language);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  return res.status(201).json(user.toJSON());
};

const activateAccount = async (req, res, next) => {
  const { token } = req.params;
  let activeUser;
  let user;

  try {
    if (token !== '') {
      user = await userService.getUserByToken(token);
    }

    if (!user) {
      return next(boom.unauthorized(res.__('userNotFound')));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    activeUser = await userService.activeAccount(user._id);
    console.log(activeUser);

    if (activeUser) {
      return res.status(204).json();
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};


const updateProfile = async (req, res, next) => {
  const { user } = req;
  const { lopdUuid, name, email, password } = req.body;
  const userUuid = user.uuid;
  let response;

  const isValidPassword = validatePasswordPattern(email, password);

  if (!isValidPassword.status) {
    const errorResponse = {
      statusCode: 422,
      message: res.__('invalidPassword2'),
      errors: isValidPassword.errors,
    };
    return res.status(422).json(errorResponse);
  }

  try {
    const userData = { lopd_uuid: lopdUuid, name, email, password };
    response = await userService.putUser(user._id, userData);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const dupField = Object.keys(error.keyValue)[0];
      return next(boom.badData(`Ya existe un usuario con ese ${dupField} introducido`));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.json(userService.toPublic(response));
};

module.exports = {
  login,
  register,
  unBlockAccount,
  activateAccount,
  updateProfile,
};

const { v4: uuidv4 } = require('uuid');
const { UserGroup } = require('../../../models/index');

const toPublic = (userGroup) => userGroup.toJSON();

// const getUserGroups = (filters, options) =>
//   models.UserGroup.findAll({
//     where: filters,
//     order: options.order,
//   });

// const getUserGroup = async (uuid) =>
//   models.UserGroup.findOne({
//     where: {
//       uuid,
//     },
//   });
const getRoleByName = async (roleName) => UserGroup.findOne({ name: roleName });

const createUserGroup = async (data) => {
  const dataToCreate = {
    ...data,
    uuid: uuidv4(),
  };
  return UserGroup.create(dataToCreate);
};

// const putUserGroup = async (uuid, data) => {
//   const userGroup = getUserGroup(uuid);
//   return userGroup.update(data);
// };

// const deleteUserGroup = async (userGroup, userId) => {
//   await userGroup.delete(userId);
// };

module.exports = {
  toPublic,
  getRoleByName,
  // getUserGroups,
  // getUserGroup,
  createUserGroup,
  // putUserGroup,
  // deleteUserGroup,
};

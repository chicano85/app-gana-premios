const { Op } = require('sequelize');

module.exports = (params) => {
  const query = {};

  if (params.name) {
    query.name = params.name;
  }

  query.deleted = false;

  return query;
};

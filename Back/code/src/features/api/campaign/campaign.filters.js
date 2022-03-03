module.exports = (params, managerUuid) => {
  const query = {};

  if (params.name) {
    query.name = params.name;
  }
  if (managerUuid) {
    query.manager_uuid = managerUuid;
  }

  query.deleted = false;

  return query;
};

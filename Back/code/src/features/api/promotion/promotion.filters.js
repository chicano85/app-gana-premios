module.exports = (params, campaignUuid) => {
  const query = {};

  if (params.campaign) {
    query.campaign_uuid = params.campaign;
  }

  if(campaignUuid){
    query.campaign_uuid = campaignUuid;
  }

  query.deleted = false;

  return query;
};

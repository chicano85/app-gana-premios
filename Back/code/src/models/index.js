const mongoose = require('mongoose');
const UserSchema = require('./user');
const UserGroupSchema = require('./userGroup');
const ClientSchema = require('./client');
const CampaignSchema = require('./campaign');
const PromotionSchema = require('./promotion');
const MediaSchema = require('./media');

const models = {
  User: mongoose.model('User', UserSchema),
  UserGroup: mongoose.model('UserGroups', UserGroupSchema),
  Client: mongoose.model('Client', ClientSchema),
  Campaign: mongoose.model('Campaign', CampaignSchema),
  Promotion: mongoose.model('Promotion', PromotionSchema),
  Media: mongoose.model('Media', MediaSchema),
};

// We export the models variable to be used in App.
module.exports = models;

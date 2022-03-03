/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema(
  {
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
    promotion_image_url: {
      required: true,
      type: String,
    },
    prize_image_url: {
      required: true,
      type: String,
    },
    prize_title: {
      required: true,
      type: String,
    },
    prize_description: {
      required: true,
      type: String,
    },
    campaign_uuid: {
      required: true,
      type: String,
    },
    start_date: {
      required: true,
      type: Date,
    },
    end_date: {
      required: true,
      type: Date,
    },
    active: {
      required: true,
      type: Boolean,
      default: true,
    },
    status: {
      required: true,
      type: Number,
      default: 0,
    },
    participation_rules: {
      required: true,
      type: String,
    },
    max_number_participants: {
      type: Number,
      default: -1,
    },
    type: {
      required: true,
      type: String,
    },
    additional_information: {
      type: Object,
      default: {},
    },
    uuid_participants: {
      type: [String],
      default: [],
    },
    promotion_history_uuid: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  },
);

module.exports = promotionSchema;

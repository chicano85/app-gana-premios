/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    client_uuid: {
      required: true,
      type: String,
    },
    manager_uuid: {
      required: true,
      type: String,
    },
    active: {
      required: true,
      type: Boolean,
      default: true,
    },
    deleted: {
      required: true,
      type: Boolean,
      default: false,
    },
    start_date: {
      required: true,
      type: Date,
    },
    end_date: {
      required: true,
      type: Date,
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

module.exports = schema;

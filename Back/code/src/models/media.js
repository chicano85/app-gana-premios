/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      unique: true,
    },
    file_name: {
      required: true,
      type: String,
    },
    original_file_name: {
      required: true,
      type: String,
    },
    extension: {
      required: true,
      type: String,
    },
    media_type: {
      required: true,
      type: String,
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

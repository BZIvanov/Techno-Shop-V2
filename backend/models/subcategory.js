const { Schema, model } = require('mongoose');
const {
  models: { Subcategory, Category },
} = require('../constants');

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Subcategory name is required'],
      minlength: [2, 'Subcategory name is too short'],
      maxlength: [32, 'Subcategory name is too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    categoryId: { type: Schema.ObjectId, ref: Category, required: true },
  },
  { timestamps: true }
);

module.exports = model(Subcategory, schema);

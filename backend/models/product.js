const { Schema, model } = require('mongoose');
const {
  models: { Product, Category, Subcategory, User },
  yesNo,
} = require('../constants');

const schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Product name is required'],
      minlength: [2, 'Product name is too short'],
      maxlength: [32, 'Product name is too long'],
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32, // TODO check this
    },
    category: {
      type: Schema.ObjectId,
      ref: Category,
    },
    subcategories: [
      {
        type: Schema.ObjectId,
        ref: Subcategory,
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: { type: Array },
    shipping: {
      type: String,
      default: yesNo.yes,
      enum: Object.values(yesNo),
    },
    color: {
      type: String,
    },
    brand: {
      type: String,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: Schema.ObjectId, ref: User },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model(Product, schema);

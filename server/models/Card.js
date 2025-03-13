const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 14,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  web: {
    type: String,
  },
  image: {
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    },
    alt: {
      type: String,
      default: "Business card image",
    },
  },
  address: {
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    street: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    houseNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    zip: {
      type: Number,
      default: 0,
    },
  },
  bizNumber: {
    type: Number,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;

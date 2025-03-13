const express = require("express");
const Joi = require("joi");
const Card = require("../models/Card");
const auth = require("../middleware/auth");
const _ = require("lodash");
const router = express.Router();

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  subtitle: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string().email().min(6).max(255).required(),
  web: Joi.string().min(2).max(255).allow(""),
  image: Joi.object({
    url: Joi.string().uri().allow(""),
    alt: Joi.string().allow(""),
  }),
  address: Joi.object({
    state: Joi.string().allow(""),
    country: Joi.string().min(2).max(255).required(),
    city: Joi.string().min(2).max(255).required(),
    street: Joi.string().min(2).max(255).required(),
    houseNumber: Joi.number().integer().min(1).required(),
    zip: Joi.number().integer().allow(0),
  }).required(),
});

// Get all cards - accessible to all
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get user's cards - registered user
router.get("/my-cards", auth.auth, async (req, res) => {
  try {
    const cards = await Card.find({ user_id: req.payload._id });
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get card by ID - accessible to all
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create new card - business user only
router.post("/", auth.auth, auth.isBusiness, async (req, res) => {
  try {
    //  Validate body
    const { error } = createCardSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //  Create card
    const card = new Card({
      ...req.body,
      user_id: req.payload._id,
    });
    await card.save();

    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Edit card - user who created the card
router.put("/:id", auth.auth, async (req, res) => {
  try {
    // 1. Validate body
    const { error } = createCardSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 2. Find card
    let card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");

    // 3. Check if user is owner of card
    if (card.user_id.toString() !== req.payload._id)
      return res.status(403).send("Access denied. Not your card");

    // 4. Update card
    card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Like card - registered user
router.patch("/:id", auth.auth, async (req, res) => {
  try {
    // 1. Find card
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");

    // 2. Toggle like
    const userIndex = card.likes.indexOf(req.payload._id);
    if (userIndex === -1) {
      card.likes.push(req.payload._id);
    } else {
      card.likes.splice(userIndex, 1);
    }

    // 3. Save card
    await card.save();
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete card - user who created the card or admin
router.delete("/:id", auth.auth, async (req, res) => {
  try {
    // 1. Find card
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");

    // 2. Check if user is owner or admin
    if (card.user_id.toString() !== req.payload._id && !req.payload.isAdmin)
      return res.status(403).send("Access denied. Not your card");

    // 3. Delete card
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).send("Card deleted");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

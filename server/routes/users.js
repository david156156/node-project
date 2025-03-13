const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const _ = require("lodash");
const router = express.Router();

const registerSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(255).required(),
    middle: Joi.string().max(255).allow(""),
    last: Joi.string().min(2).max(255).required(),
  }).required(),
  email: Joi.string().email().min(6).max(255).required(),
  password: Joi.string().min(6).max(1024).required(),
  image: Joi.object({
    url: Joi.string().allow(""),
    alt: Joi.string().allow(""),
  }),
  address: Joi.object({
    state: Joi.string().allow(""),
    country: Joi.string().min(2).max(255).required(),
    city: Joi.string().min(2).max(255).required(),
    street: Joi.string().min(2).max(255).required(),
    houseNumber: Joi.number().integer().min(1).required(),
    zip: Joi.number().integer(),
  }).required(),
  phone: Joi.string().min(9).max(14).required(),
  isBusiness: Joi.boolean(),
});

//register user
router.post("/", async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin, isBusiness: user.isBusiness },
      process.env.JWT_SECRET
    );
    res.status(201).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(8).max(255).required(),
  password: Joi.string().min(6).max(1024).required(),
});

//login user
router.post("/login", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin, isBusiness: user.isBusiness },
      process.env.JWT_SECRET
    );

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all users for admin
router.get("/", auth.auth, auth.isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send;
  }
});

// get user by id for admin or user registered
router.get("/:id", auth.auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id && !req.payload.isAdmin)
      return res.status(403).send("Access denied");

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("No such user");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update user by id for user registered
router.put("/:id", auth.auth, async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send("No such user");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//change isBusiness by id for user registered
router.patch("/:id", auth.auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id && !req.payload.isAdmin)
      return res.status(403).send("Access denied");

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBusiness: req.body.isBusiness },
      {
        new: true,
      }
    );
    if (!user) return res.status(404).send("No such user");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete user by id for user registered or admin
router.delete("/:id", auth.auth, async (req, res) => {
  try {
    // 1. check if user is deleting his own profile or is admin
    if (req.payload._id !== req.params.id && !req.payload.isAdmin)
      return res.status(403).send("Access denied");

    // 2. delete user
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("No such user");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

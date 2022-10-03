const router = require("express").Router();
const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  let user = await new User(
    _.pick(req.body, [
      "username",
      "email",
      "password",
      "profilePicture",
      "coverPicture",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.status(200).json(user);
});

//LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(404).json("Invalid email or password");

  res.status(200).json(user);
});

module.exports = router;

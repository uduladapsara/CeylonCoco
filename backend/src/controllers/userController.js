const User = require("../models/User");

exports.getUsers = async (
  req,
  res
) => {

  const users =
    await User.find().select(
      "-password"
    );

  res.json(users);
};

exports.getUserById = async (
  req,
  res
) => {

  const user =
    await User.findById(
      req.params.id
    ).select("-password");

  res.json(user);
};

exports.updateUser = async (
  req,
  res
) => {

  const user =
    await User.findById(
      req.params.id
    );

  if (!user) {
    return res
      .status(404)
      .json({
        message:
          "User not found"
      });
  }

  user.name =
    req.body.name ||
    user.name;

  user.email =
    req.body.email ||
    user.email;

  user.role =
    req.body.role ||
    user.role;

  const updated =
    await user.save();

  res.json(updated);
};

exports.deleteUser = async (
  req,
  res
) => {

  const user =
    await User.findById(
      req.params.id
    );

  if (!user) {
    return res
      .status(404)
      .json({
        message:
          "User not found"
      });
  }

  await user.deleteOne();

  res.json({
    message:
      "User deleted"
  });
};
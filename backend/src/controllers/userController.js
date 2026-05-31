const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      role,
      phone,
      status,
      profileImage
    } = req.body;

    const userExists = await User.findOne({
      email
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      status,
      profileImage
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
      profileImage: user.profileImage,
      createdAt: user.createdAt
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

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

  user.phone =
    req.body.phone ||
    user.phone;

  if (
    typeof req.body.status ===
    "boolean"
  ) {
    user.status = req.body.status;
  }

  if (
    typeof req.body.profileImage ===
    "string"
  ) {
    user.profileImage =
      req.body.profileImage;
  }

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
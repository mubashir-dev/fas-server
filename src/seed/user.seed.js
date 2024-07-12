const User = require("../models/user.model");
const { Encryption } = require("../utils/hashing.util");

module.exports.seedUser = async () => {
  const passwordHash = await Encryption.encrypt("admin"); //admin
  const user = {
    name: "Ali",
    email: "admin@example.com",
    password: passwordHash,
  };
  await User.deleteMany({});
  await User.create(user);
};

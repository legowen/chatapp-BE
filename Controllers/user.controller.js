const User = require("../Models/user");
const userController = {};

userController.saveUser = async (userName, sid) => {
  //Check registered User
  let user = await User.findOne({ name: userName });
  // If not, Create New User
  if (!user) {
    user = new User({
      name: userName,
      token: sid,
      online: true,
    });
  }
  //If Registered User, only change Token value.
  user.token = sid;
  user.online = true;

  await user.save();
  return user;
};

userController.checkUser = async (sid) => {
  const user = await User.findOne({ token: sid });
  if (!user) throw new Error("user not found");
  return user;
};

module.exports = userController;

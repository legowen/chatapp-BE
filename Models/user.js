const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have name"],
    unique: true,
  },
  token: {
    type: Boolean,
    default: false,
  },
  online: {
      type: Boolean,
      default: false,
  },
});
module.exports = mongoose.model("User", userSchema);

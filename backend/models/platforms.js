const mongoose = require("mongoose");

const UserPlatformSchema = new mongoose.Schema({
  email: { type: String, required: true },
  platform: { type: String, required: true }, // leetcode, codeforces, etc.
  username: { type: String, required: true },
}, { timestamps: true });

UserPlatformSchema.index({ email: 1, platform: 1 }, { unique: true }); // prevent duplicates

module.exports = mongoose.model("UserPlatform", UserPlatformSchema);

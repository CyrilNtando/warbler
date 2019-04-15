const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//create a user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  profileImageUrl: {
    type: String
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});
//before saving user to database, run a hook
userSchema.pre("save", async function(next) {
  try {
    //if passowrd not modified move on to the next() thing
    if (!this.isModified("password")) {
      return next();
    }
    //hashing password
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    next(err);
  }
});

//helper fnc for comparing password
userSchema.methods.comparePassword = async function(cadidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(cadidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};
//Create a user Model
const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");
const User = require("./User");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 160
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

messageSchema.pre("remove", async function(next) {
  try {
    //find user
    let user = await User.findById(this.user);
    //remove the id of the message from the user message list
    await user.messages.remove(this.id);
    //save that user
    await user.save();

    //return next
    return next();
  } catch (error) {
    return next(err);
  }
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

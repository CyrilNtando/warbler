const db = require("../models");

//api/users/:id/messages
exports.createMessage = async function(req, res, next) {
  try {
    //create a new message
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    //find user using params
    let foundUser = await db.User.findById(req.params.id);
    //push message to the messages array
    foundUser.messages.push(message.id);
    //save user
    await foundUser.save();
    //return a message with username and profile pic url
    let foundMessage = await db.Message.findById(message.id).populate("user", {
      username: true,
      profileImageUrl: true
    });

    return res.status(200).json(foundMessage);
  } catch (error) {
    return next(error);
  }
};
// GET -/api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next) {
  try {
    //get message using params
    let message = await db.Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (error) {
    return next(error);
  }
};

//DELETE -/api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (error) {
    return next(error);
  }
};

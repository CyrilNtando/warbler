const express = require("express");
//merge params allows us to get the ID of this router
const router = express.Router({ mergeParams: true });
const {
  createMessage,
  getMessage,
  deleteMessage
} = require("../handlers/messages");

//prefix - /api/users/:id/messages
router.route("/").post(createMessage);

//-/api/users/:id/messages/:message_id
router
  .route("/:message_id")
  .get(getMessage)
  .delete(deleteMessage);

module.exports = router;

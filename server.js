require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const db = require("./models");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//if routes prefix is "/api/auth" use authRoutes
app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);

app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
});
//Default route
//when an invalid route is enter
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//This is going to take any Incoming Middleware with an error
app.use(errorHandler); //must be before listen or at the end
app.listen(PORT, function() {
  console.log("server is starting on " + PORT);
});
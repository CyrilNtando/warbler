const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    //find a user
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    //check if pasword matches
    console.log("check password");
    let isMatch = await user.comparePassword(req.body.password);
    console.log("check password finshed");
    //log them in
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );

      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email / password 1"
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Email / password"
    });
  }
};
exports.signup = async function(req, res, next) {
  try {
    // create a user using the user model
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    // create a token(signing a token)
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      // after siging in that object, pass the secret key
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    // if the validation fails
    if (err.code === 11000) {
      // respond with this msg
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

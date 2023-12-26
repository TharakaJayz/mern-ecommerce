const isEmptyValidator = require("../Validations/Validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const userType = "user";
  if (
    isEmptyValidator([email, password, firstName, lastName, mobile, address])
  ) {
    const error = new Error("all Fields should be filled message");
    error.statusCode = 400;
    throw error;
  } else {
    if (password.length <= 5) {
      const error2 = new Error("Password should have more than 5 characters");
      error2.statusCode = 400;
      throw error2;
    } else {
      try {
        let existingUserCount = await User.countDocuments({ email: email });
        if (existingUserCount !== 0) {
          const error = new Error("User with this email already exists");
          error.statusCode = 409;
          throw error;
        }

        const hashedPassowrd = await bcrypt.hash(password, 12);
        const user = new User({
          email: email,
          password: hashedPassowrd,
          firstname: firstName,
          lastname: lastName,
          mobile: mobile,
          address: address,
          userType: userType,
        });
        const savedUser = await user.save();
        res.status(201).json({
          message: "user Created",
          details: savedUser,
        });
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 400;
        }
        next(err);
      }
    }
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (isEmptyValidator([email, password])) {
    const error = new Error("All Fields Should be FIlled !");
    error.statusCode = 400;
    throw error;
  }

  let existuser;
  try {
    existuser = await User.findOne({ email: email });
    if (!existuser) {
      const error = new Error("This email does not exists !");
      error.statusCode = 404;
      throw error;
    }

    let comparePassword = await bcrypt.compare(password, existuser.password);
    if (!comparePassword) {
      const error = new Error("Invalid Passoword");
      error.statusCode = 401;
      throw error;
    }
    // check for special admin login and if it is not true userType should be user
    


    const token = jwt.sign(
      {
        email: existuser.email,
        firstName: existuser.firstname,
        userId: existuser._id.toString(),
      },
      "supersecretsignaturetharakaead",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login Successfull",
      token: token,
      firstname: existuser.firstname,
      userType:existuser.userType
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

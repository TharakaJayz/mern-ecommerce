const isEmptyValidator = require("../Validations/Validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { use } = require("../routes/auth");
exports.signUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const mobile = req.body.mobile;
  const address = req.body.address;

  if (
    isEmptyValidator([email, password, firstName, lastName, mobile, address])
  ) {
    const error = new Error();
    error.statusCode = 400;
    error.message = "all Fields should be filled message";
    next(error);
  } else {
    if (password.length <= 5) {
      const error2 = new Error();
      error2.statusCode = 400;
      error2.message = "Password should have more than 5 characters";
      next(error2);
    } else {
      try {
        const hashedPassowrd = await bcrypt.hash(password, 12);
        const user = new User({
          email: email,
          password: hashedPassowrd,
          firstname: firstName,
          lastname: lastName,
          mobile: mobile,
          address: address,
        });
        const savedUser = await user.save();
        res.status(201).json({
          message:"user Created",details:savedUser
        })
      } catch (err) {
        err.statusCode = 400;
        next(err);
      }

    }
  }

  // res.json({
  //   email: email,
  //   password: password,
  //   firstName: firstName,
  //   lastName: lastName,
  //   mobile: mobile,
  //   address: address,
  // });
};

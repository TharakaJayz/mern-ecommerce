const isEmptyValidator = require("../Validations/Validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");


exports.signUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const userType = "user"
  if (
    isEmptyValidator([email, password, firstName, lastName, mobile, address])
  ) {
    const error = new Error("all Fields should be filled message");
    error.statusCode = 400;
    throw error;
  } else {
    if (password.length <= 5) {
      const error2 = new Error( "Password should have more than 5 characters");
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
          userType:userType
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


exports.login = (req,res,next)  =>{

  const email = req.body.email;
  const 
}
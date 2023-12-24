const isEmptyValidator = require("../Validations/Validations");

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const mobile = req.body.mobile;
  const address = req.body.address;

  console.log("isEmoty output", isEmptyValidator(["z", "z", "name","sdfdf"]));
  
  res.json({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    address: address,
  });
};

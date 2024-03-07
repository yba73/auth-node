const userService = require("../services/user.services");

var createUserControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    const status = await userService.createUserDBService(req.body);
    console.log("status", status);

    if (status) {
      return res.send({ status: true, message: "User created successfully" });
    } else {
      return res.send({ status: false, message: "Error creating user" });
    }
  } catch (err) {
    console.log(err);
  }
};

var loginUserControllerFn = async (req, res) => {
  var result = null;
  try {
    result = await userService.loginuserDBService(req.body);
    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.msg });
  }
};

module.exports = { createUserControllerFn, loginUserControllerFn };

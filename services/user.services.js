const userModel = require("../models/user.model");
const key = "123456789trytryrtyr";
const encryptor = require("simple-encryptor")(key);

module.exports.createUserDBService = async (userDetails) => {
  try {
    // const userModelData = new userModel();

    // userModelData.firstname = userDetails.firstname;
    // userModelData.lastname = userDetails.lastname;
    // userModelData.email = userDetails.email;
    // userModelData.password = userDetails.password;
    const encrypted = encryptor.encrypt(userDetails.password);
    // userModelData.password = encrypted;
    await userModel.create({
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      email: userDetails.email,
      password: encrypted,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// module.exports.loginuserDBService = (employeeDetails) => {
//   return new Promise(function myFn(resolve, reject) {
//     userModel.findOne(
//       { email: employeeDetails.email },
//       function getresult(errorvalue, result) {
//         if (errorvalue) {
//           reject({ status: false, msg: "Invaild Data" });
//         } else {
//           if (result != undefined && result != null) {
//             const decrypted = encryptor.decrypt(result.password);

//             if (decrypted == employeeDetails.password) {
//               resolve({ status: true, msg: "Employee Validated Successfully" });
//             } else {
//               reject({ status: false, msg: "Employee Validated failed" });
//             }
//           } else {
//             reject({ status: false, msg: "Invaild Employee Detailssss" });
//           }
//         }
//       }
//     );
//   });
// };

module.exports.loginuserDBService = async (employeeDetails) => {
  try {
    if (!employeeDetails) return { status: false, msg: "Invaild Data" };
    const user = await userModel.findOne({ email: employeeDetails.email });
    if (!user) return { status: false, msg: "Invaild Employee Detailssss" };
    const decrypted = encryptor.decrypt(user.password);
    console.log("decrypted", decrypted);
    if (decrypted == employeeDetails.password)
      return { status: true, msg: "Employee Validated Successfully" };
    else return { status: false, msg: "Employee Validated failed" };
  } catch (error) {
    console.log(error);
    return { status: false, msg: "Invaild Employee Detailssss" };
  }
};

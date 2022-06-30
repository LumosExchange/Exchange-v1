const yup = require("yup");

const userLoginSchema = yup.object({
  userName: yup.string().required("User name is required"),
});

const userRegisterSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("User name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Passsword is required"),
});

module.exports = { userLoginSchema, userRegisterSchema };

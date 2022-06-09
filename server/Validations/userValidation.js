const yup = require('yup');

const userSchema = yup.object({
    firstName: yup
    .string()
    .required('First name is required'),
    lastName: yup
    .string()
    .required('Last name is required'),
    email: yup
    .string()
    .email('Email is required').
    required(),
    password: yup
    .string()
    .min(8, 'Password is too short')
    .max(20, 'Password is too long')
    .required(),
    userName: yup
    .string()
    .min(4, 'Username is too short')
    .max(30, 'Username is too long')
    .required(),
});

userSchema.validate();

module.exports = {userSchema};
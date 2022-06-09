const yup = require('yup');

const addPaypalSchema = yup.object({
    email: yup
    .required('email is required')
    .string()
    .min()
    .max(),
});

addPaypalSchema.validate();

module.exports = {addPaypalSchema};

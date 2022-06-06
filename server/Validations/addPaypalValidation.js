const yup = require('yup');

const addPaypalSchema = yup.object({
    email: yup
    .required()
    .string()
    .min()
    .max(),
});

addPaypalSchema.validate();

module.exports = {addPaypalSchema};

const yup = require('yup');

const addSkrillSchema = yup.object({
    email: yup
    .required()
    .string()
    .min()
    .max(),
});

addSkrillSchema.validate();

module.exports = {addSkrillSchema};

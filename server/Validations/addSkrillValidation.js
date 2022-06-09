const yup = require('yup');

const addSkrillSchema = yup.object({
    email: yup
    .required('Email is required')
    .string()
    .min()
    .max(),
});

addSkrillSchema.validate();

module.exports = {addSkrillSchema};

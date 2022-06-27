const yup = require('yup');

const bronzeUpgradeSchema = yup.object({
    file: yup
    .require('File is required'),
    name: yup
    .string()
    .require('Name is required'),
    address: yup
    .string()
    .required('Address is required'),
    city: yup
    .string()
    .required('City is required'),
    cityState: yup
    .string()
    .required(' City state is required'),
    postCode: yup
    .string()
    .required('Postcode is required'),
    country: yup
    .string()
    .required('Country is required'),
});

bronzeUpgradeSchema.validate();

module.exports = {bronzeUpgradeShema};

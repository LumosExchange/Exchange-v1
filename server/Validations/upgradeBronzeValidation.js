const yup = require('yup');

const bronzeUpgradeSchema = yup.object({
    file: yup
    .require('File is required'),
    name: yup
    .string()
    .require(),
    address: yup
    .string()
    .required(),
    city: yup
    .string()
    .required(),
    cityState: yup
    .string()
    .required(),
    postCode: yup
    .string()
    .required(),
    country: yup
    .string()
    .required(),
});

bronzeUpgradeSchema.validate();

module.exports = {bronzeUpgradeShema};

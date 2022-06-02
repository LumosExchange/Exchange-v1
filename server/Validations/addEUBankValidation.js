const yup = require('yup');

const addEUBankSchema = yup.object({
    bankName: yup
    .required()
    .string()
    .max()
    .min(),
    BIC: yup
    .required()
    .number()
    .min()
    .max(),
    IBAN: yup
    .required()
    .number()
    .min()
    .max(),
});

addEUBankSchema.validate();

module.exports = {addEUBankSchema};

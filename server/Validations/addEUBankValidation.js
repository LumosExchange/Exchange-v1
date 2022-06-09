const yup = require('yup');

const addEUBankSchema = yup.object({
    bankName: yup
    .required('Bank name is required')
    .string()
    .max()
    .min(),
    BIC: yup
    .required('BIC is required')
    .number()
    .min()
    .max(),
    IBAN: yup
    .required('IBAN is required')
    .number()
    .min()
    .max(),
});

addEUBankSchema.validate();

module.exports = {addEUBankSchema};

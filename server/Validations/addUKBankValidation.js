const yup = require('yup');

const addUKBankSchema = yup.object({
    sortCode: yup
    .require('Sort code is required')
    .number()
    .min()
    .max(),
    accountNumber: yup
    .require('Account number is required')
    .number()
    .min()
    .max(),
});

addUKBankSchema.validate();

module.exports = {addUKBankSchema};

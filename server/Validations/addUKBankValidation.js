const yup = require('yup');

const addUKBankSchema = yup.object({
    sortCode: yup
    .require()
    .number()
    .min()
    .max(),
    accountNumber: yup
    .require()
    .number()
    .min()
    .max(),
});

addUKBankSchema.validate();

module.exports = {addUKBankSchema};

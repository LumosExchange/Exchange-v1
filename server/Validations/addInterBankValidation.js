const yup = require('yup');

const addInterBankSchema = yup.object({
    bankName: yup
    .require('Bank name is required')
    .string()
    .min()
    .max(),
    bankCity: yup
    .require('bank city is required')
    .string()
    .min()
    .max(),
    bankCountry: yup
    .require('Bank country is required')
    .string()
    .min()
    .max(),
    SWIFTCode: yup
    .require('SWIFT code is required')
    .number()
    .min()
    .max(),
    payeeName: yup
    .require('Payee name is required')
    .string()
    .min()
    .max(),
    interBankName: yup
    .require('International bank name is required')
    .string()
    .min()
    .max(),
    interBankCity: yup
    .require('International bank city is required')
    .string()
    .min()
    .max(),
    interBankCountry: yup
    .require('International bank country is required')
    .string()
    .min()
    .max(),
    interBankAccountNumber: yup
    .require('International bank account number is required')
    .number()
    .min()
    .max(),
    interBankRoutingNumber: yup
    .require('International bank routing number is required')
    .number()
    .min()
    .max(),
});

addInterBankSchemaSchema.validate();

module.exports = {addInterBankSchemaSchema};

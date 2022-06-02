const yup = require('yup');

const addInterBankSchema = yup.object({
    bankName: yup
    .require()
    .string()
    .min()
    .max(),
    bankCity: yup
    .require()
    .string()
    .min()
    .max(),
    bankCountry: yup
    .require()
    .string()
    .min()
    .max(),
    SWIFTCode: yup
    .require()
    .number()
    .min()
    .max(),
    payeeName: yup
    .require()
    .string()
    .min()
    .max(),
    interBankCountry: yup
    .require()
    .string()
    .min()
    .max(),
    interBankCity: yup
    .require()
    .string()
    .min()
    .max(),
    interBankCountry: yup
    .require()
    .string()
    .min()
    .max(),
    interBankAccountNumber: yup
    .require()
    .number()
    .min()
    .max(),
    interBankRoutingNumber: yup
    .require()
    .number()
    .min()
    .max(),
});

addInterBankSchemaSchema.validate();

module.exports = {addInterBankSchemaSchema};

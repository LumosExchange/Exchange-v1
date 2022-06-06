const yup = require('yup');

const openTradeSchema = yup.object({
    saleID: yup
    .require()
    .number(),
    sellerID: yup
    .require()
    .number(),
    paymentMethod: yup
    .required()
    .string(),
    userSolPrice: yup
    .required()
    .number(),
    amountOfSol: yup
    .required()
    .number(),
    fiatAmount: yup
    .required()
    .number(),
    paymentCurrency: yup
    .required()
    .string(),
    message: yup
    .required()
    .string()
    .min()
    .max(),
    reference: yup
    .required()
    .string()
    .min()
    .max(),
    walletAddress: yup
    .required()
    .string()
    .min()
    .max(),
});

openTradeSchema.validate();

module.exports = {openTradeSchema};

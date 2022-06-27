const yup = require('yup');

const openTradeSchema = yup.object({
    saleID: yup
    .require()
    .number(),
    sellerID: yup
    .require()
    .number(),
    paymentMethod: yup
    .required('Payment method is required')
    .string(),
    userSolPrice: yup
    .required()
    .number(),
    amountOfSol: yup
    .required('Amount of SOL is required')
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
    .required('Wallet address is required')
    .string()
    .min()
    .max(),
});

openTradeSchema.validate();

module.exports = {openTradeSchema};

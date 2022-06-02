const yup = require('yup');

const addWalletSchema = yup.object({
    walletID: yup
    .required()
    .number()
    .min()
    .max(),
    walletAddress: yup
    .require()
    .min()
    .max()
    .string(),
    walletType: yup
    .require()
    .string()
    .min()
    .max(),
});

addWalletSchema.validate();

module.exports = {addWalletSchema};

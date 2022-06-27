const yup = require('yup');

const addWalletSchema = yup.object({
    walletID: yup
    .required()
    .number()
    .min()
    .max(),
    walletAddress: yup
    .require('Wallet address is required')
    .min()
    .max()
    .string(),
    walletType: yup
    .require('Wallet type is required')
    .string()
    .min()
    .max(),
});

addWalletSchema.validate();

module.exports = {addWalletSchema};

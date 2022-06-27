const yup = require('yup');

const saleSchema = yup.object({
    amountForSale: yup
    .number()
    .required('Amount of SOL for sale is required'),
    aboveOrBelow: yup
    .string()
    .required('ABove ort below must be selected'),
    change: yup
    .number()
    .required('% Change is required'),
    payment1: yup
    .string()
    .required('Payment method 1 is required'),
    payment2: yup
    .string()
    .required('Payment method 2 is required'),
});

saleSchema.validate();

module.exports = {saleSchema};
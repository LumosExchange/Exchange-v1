const yup = require('yup');

const saleSchema = yup.object({
    amountForSale: yup
    .number()
    .required(),
    aboveOrBelow: yup
    .string()
    .required(),
    change: yup
    .number()
    .required(),
    payment1: yup
    .string()
    .required(),
    payment2: yup
    .string()
    .required(),
});

saleSchema.validate();

module.exports = {saleSchema};
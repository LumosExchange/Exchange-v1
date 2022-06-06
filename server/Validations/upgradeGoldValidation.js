const yup = require('yup');

const goldUpgrade = yup.object({
    file: yup
    .require(),
    EmployerName: yup
    .string()
    .require(),
    EmployerAddress: yup
    .require()
    .string(),
    Occupation: yup
    .require()
    .string(),
    Income: yup
    .require()
    .string(),
});

goldUpgrade.validate();

module.exports = {goldUpgrade};

const yup = require('yup');

const goldUpgrade = yup.object({
    file: yup
    .require('File is required'),
    EmployerName: yup
    .string()
    .require('Employer name is required'),
    EmployerAddress: yup
    .require()
    .string('Emplaoyer adress is required'),
    Occupation: yup
    .require('Occupation is required')
    .string(),
    Income: yup
    .require('Income is required')
    .string(),
});

goldUpgrade.validate();

module.exports = {goldUpgrade};

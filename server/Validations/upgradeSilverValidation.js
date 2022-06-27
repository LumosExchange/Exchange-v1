const yup = require('yup');

const silverUpgradeSchema = yup.object({
    file: yup
    .require('File is required'),
    birthDay: yup
    .number()
    .require('Birthday is required'),
    birthMonth: yup
    .number()
    .require('Birth month is required'),
    birthYear: yup
    .number()
    .require('Birth year is required'),
});

silverUpgradeSchema.validate();

module.exports = {silverUpgradeSchema};

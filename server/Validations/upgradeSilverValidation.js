const yup = require('yup');

const silverUpgradeSchema = yup.object({
    file: yup
    .require(),
    birthDay: yup
    .number()
    .require(),
    birthMonth: yup
    .number()
    .require(),
    birthYear: yup
    .number()
    .require(),
});

silverUpgradeSchema.validate();

module.exports = {silverUpgradeSchema};

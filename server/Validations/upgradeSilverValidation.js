const yup = require('yup');

const silverUpgrade = yup.object({
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

silverUpgrade.validate();

module.exports = {silverUpgrade};

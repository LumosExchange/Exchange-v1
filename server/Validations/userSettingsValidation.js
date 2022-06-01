const yup = require('yup');

const userSettingsSchema = yup.object({
    timezone: yup
    .string()
    .require(),
    currency: yup
    .string()
    .require(),
});

userSettingsSchema.validate();

module.exports = {userSettingsSchema};

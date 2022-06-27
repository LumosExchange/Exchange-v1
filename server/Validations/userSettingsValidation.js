const yup = require('yup');

const userSettingsSchema = yup.object({
    timezone: yup
    .string()
    .require('Timezone is required'),
    currency: yup
    .string()
    .require('Currency is required'),
});

userSettingsSchema.validate();

module.exports = {userSettingsSchema};

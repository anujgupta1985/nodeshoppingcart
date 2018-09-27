/// Set multiple language start
const i18n = require("i18n");

i18n.configure({
    locales:['en', 'de', "fr"],
    defaultLocale: 'en',
    register: global,
    directory: __dirname + '/locales'
});

module.exports = i18n;
const i18n = require('i18n');

const defaultLanguage = i18n.getLocale();

const getTranslation = (key, language) => {
  if (language) {
    i18n.setLocale(language);
  } else {
    i18n.setLocale(defaultLanguage);
  }
  const result = i18n.__(key);
  i18n.setLocale(defaultLanguage);

  return result;
};

module.exports = {
  getTranslation,
};

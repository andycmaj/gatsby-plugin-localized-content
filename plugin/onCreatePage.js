const buildLanguagePath = require('./buildLanguagePath');

module.exports = ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions;
  const { defaultLanguage, languages } = pluginOptions;

  if (page.context.lng) {
    console.log('skipping language-specific page', page.context.lng);
    return;
  }

  languages.forEach(language => {
    let context = {
      lng: language,
      originalPath: page.path,
      availableLngs: languages,
      defaultLng: defaultLanguage,
      fallbackLng: defaultLanguage,
    };

    if (language === defaultLanguage) {
      deletePage(page);
      createPage({
        ...page,
        context,
      });
    } else {
      createPage({
        ...page,
        path: buildLanguagePath(page.path, language),
        context,
      });
    }
  });
};

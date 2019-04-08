const pathUtils = require('path');
const buildLanguagePath = require('./buildLanguagePath');

module.exports = ({ actions, graphql }, pluginOptions) => {
  const { createPage } = actions;
  const {
    defaultLanguage,
    languages,
    pageTemplate,
    contentDir,
  } = pluginOptions;

  return graphql(`
    {
      pages: allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "${contentDir}/**" } }
      ) {
        edges {
          node {
            fileAbsolutePath
            html
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.error(result.errors);
      return Promise.reject(result.errors);
    }

    result.data.pages.edges.forEach(({ node }) => {
      const { fileAbsolutePath } = node;
      const path = `/${pathUtils.basename(fileAbsolutePath, '.md')}`;
      const relativePath = pathUtils.relative(contentDir, fileAbsolutePath);
      const langDir = pathUtils.parse(relativePath).dir;

      if (!languages.includes(langDir)) {
        console.error('invalid language', node);
        return Promise.reject('invalid language', node);
      }

      createPage({
        path:
          langDir === defaultLanguage ? path : buildLanguagePath(path, langDir),
        component: pageTemplate,
        context: {
          lng: langDir,
          defaultLng: defaultLanguage,
          fallbackLng: defaultLanguage,
          availableLngs: languages,
          node,
        },
      });
    });
  });
};

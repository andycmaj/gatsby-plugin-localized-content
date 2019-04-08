const fs = require('fs-extra');

module.exports = async ({ store, getNodes }, pluginOptions) => {
  const program = store.getState().program;
  const fragment = `
    import { graphql } from 'gatsby';
    export const translationsFragment = graphql\`
      fragment Translations on LocalizedStringsConnection {
        edges {
          node {
            id
            lng
            ns
            serializedData
          }
        }
      }
    \`;
  `;
  const file = `${
    program.directory
  }/.cache/fragments/localized-strings-fragments.js`;

  await fs.outputFile(file, fragment);
};

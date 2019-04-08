const { mergeAll, map, compose } = require('ramda');
const crypto = require('crypto');

// https://gist.github.com/andycmaj/ced330282929fc410e501f7dccad33b5
const mergeKeyValuePairs = compose(
  // [{key1: value1}, {key2: value2}, {key1: value3}] => {key1: value3, key2: value2}
  mergeAll,
  // [{key: k, value: v}] => [{ k: v }]
  map(({ key, value }) => ({ [key]: value }))
);

module.exports = async (
  { node, actions: { createNode, createParentChildLink }, getNode },
  { languages }
) => {
  const {
    parent: parentId,
    internal: { type, owner },
    absolutePath,
    id,
  } = node;

  const typeMatcher = new RegExp(`^(${languages.join('|')})yaml$`, 'i');
  const isTranslatedStringsType = type.match(typeMatcher);

  if (owner !== 'gatsby-transformer-yaml-plus' || !isTranslatedStringsType) {
    return;
  }

  const { relativeDirectory: language, name } = getNode(parentId);

  const data = mergeKeyValuePairs(node.strings);
  const serializedData = JSON.stringify(data, undefined, '');

  const contentDigest = crypto
    .createHash(`md5`)
    .update(serializedData)
    .digest(`hex`);

  const localeNode = {
    id: `${id} >>> LocalizedStrings >>> ${language}`,
    children: [],
    parent: id,
    internal: {
      content: serializedData,
      contentDigest,
      type: `LocalizedStrings`,
    },
    lng: language,
    ns: name,
    serializedData,
    fileAbsolutePath: absolutePath,
  };

  createNode(localeNode);

  createParentChildLink({ parent: node, child: localeNode });
};

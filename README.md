[![npm version](https://img.shields.io/npm/v/gatsby-plugin-localized-content.svg?style=for-the-badge)](https://npmjs.org/package/gatsby-plugin-localized-content "View this project on npm")

# gatsby-plugin-localized-content

> Inspired by https://github.com/ikhudo/gatsby-i18n-plugin

This plugin provides a straightforward way to localize your CMS-managed string dictionaries and markdown pages.

It integrates `react-i18next` and gatsby [markdown-enabled yaml values](https://github.com/supernotes/gatsby-transformer-yaml-plus), in a way that makes it easy to translate and consume CMS-managed strings.


## Using the plugin

```js
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { I18n } from 'gatsby-plugin-localized-content';
import { FlagsProvider } from './utils/featureFlags';
import { ConfigProvider } from './utils/config';
import { graphql, StaticQuery } from 'gatsby';

const stringsQuery = graphql`
  query {
    allLocalizedStrings {
      ...Translations
    }
  }
`;

export default ({ element, props }) => (
  <StaticQuery
    query={stringsQuery}
    render={data => (
      <I18n {...data} {...props}>
        <ThemeProvider theme={theme}>
          <Global styles={theme.css.reset} />
          <Global styles={theme.css.globals} />
          <FlagsProvider>
            <ConfigProvider>{element}</ConfigProvider>
          </FlagsProvider>
        </ThemeProvider>
      </I18n>
    )}
  />
);
```

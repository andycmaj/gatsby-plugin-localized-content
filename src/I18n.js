import React, { Component } from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { I18nProvider } from 'gatsby-i18n';
import { graphql, StaticQuery } from 'gatsby';

const init = ({ fallbackLng, debug }) => {
  i18next.init({
    debug,
    defaultNS: 'strings',
    fallbackLng,
  });

  return i18next;
};

class I18n extends Component {
  constructor(props) {
    super(props);

    const { pageContext } = props;

    this.i18n = init(pageContext);
    this.activateLng();
  }

  activateLng() {
    const {
      allLocalizedStrings,
      pageContext: { lng: pageLanguage },
    } = this.props;

    if (allLocalizedStrings) {
      allLocalizedStrings.edges.forEach(({ node }) => {
        const { lng, ns, serializedData } = node;

        const parsedData = JSON.parse(serializedData);

        if (!this.i18n.hasResourceBundle(lng, ns)) {
          this.i18n.addResources(lng, ns, parsedData);
        }
      });
    }

    this.i18n.changeLanguage(pageLanguage);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pageContext.lng !== prevProps.pageContext.lng) {
      this.activateLng();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <I18nextProvider i18n={this.i18n}>
        <I18nProvider {...this.props.pageContext}>{children}</I18nProvider>
      </I18nextProvider>
    );
  }
}

export default I18n;

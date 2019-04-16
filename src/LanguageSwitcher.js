import React from 'react';
import styled from '@emotion/styled';
import { I18nConsumer } from 'gatsby-i18n';
import withTranslations from './withTranslations';
import { compose, lifecycle, withHandlers } from 'recompose';
import { autoDetectLanguage } from './autoDetectLang';

const LanguageLink = styled.a``;

const Switcher = ({ t, lng, className, getLngPath }) => {
  // HACK for initial change not working
  const newLng = lng === 'es' ? 'en' : 'es';
  const newUrl = getLngPath(newLng);

  return (
    <LanguageLink className={className} href={newUrl}>
      {lng === 'es' ? t('inEnglish') : t('enEspanol')}
    </LanguageLink>
  );
};

const Container = compose(
  withTranslations('strings'),
  withHandlers({
    getLngPath: ({ originalPath }) => newLng => {
      let originalUrl = originalPath;
      if (typeof window !== 'undefined') {
        originalUrl.concat(window.location.search);
      }
      return newLng === 'en' ? `${originalUrl}` : `/${newLng}${originalUrl}`;
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.shouldAutoDetect &&
        autoDetectLanguage(
          this.props.lng,
          this.props.defaultLng,
          this.props.availableLngs,
          lang => this.props.getLngPath(lang)
        );
    },
  })
)(Switcher);

export default props => (
  <I18nConsumer>
    {pageContext => <Container {...props} {...pageContext} />}
  </I18nConsumer>
);

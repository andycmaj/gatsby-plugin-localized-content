import React from 'react';
import { I18nConsumer } from 'gatsby-i18n';
import withTranslations from './withTranslations';
import { compose, withState } from 'recompose';

const Switcher = ({ className, t, currentLng, originalPath }) => {
  // HACK for initial change not working
  const newLng = currentLng === 'es' ? 'en' : 'es';
  const pathLng = newLng === 'en' ? '' : `/${newLng}`;
  const newUrl = `${pathLng}${originalPath}`;

  return (
    <a className={`link ${className}`} href={newUrl}>
      <span className="normal">
        {currentLng === 'es' ? t('inEnglish') : t('enEspanol')}
      </span>
      <span className="tiny">
        {currentLng === 'es' ? t('inEnglishTiny') : t('enEspanolTiny')}
      </span>
    </a>
  );
};

const Container = compose(
  withState('currentLng', 'setCurrentLng', ({ lng }) => lng),
  withTranslations('strings')
)(Switcher);

export default props => (
  <I18nConsumer>
    {pageContext => <Container {...props} {...pageContext} />}
  </I18nConsumer>
);

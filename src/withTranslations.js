import React from 'react';
import { fromRenderProps } from 'recompose';
import { Translation } from 'react-i18next';

const GetTranslationHoc = ns => ({ render }) => (
  <Translation useSuspense={false} ns={ns}>
    {(t, i18Props) => render(t, i18Props)}
  </Translation>
);

const withTranslations = ns =>
  fromRenderProps(
    GetTranslationHoc(ns),
    (t, { i18n, lng }) => ({ t, i18n, lng }),
    'render'
  );

export default withTranslations;

import { useTranslation } from 'react-i18next';

export default (ns, opts) =>
  useTranslation(ns, { ...opts, useSuspense: false });

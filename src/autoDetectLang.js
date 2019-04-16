import { lookup, navigatorLanguages } from 'langtag-utils';

const canAccessStorage = () =>
  typeof Storage !== 'undefined' && typeof navigator != 'undefined';

export const autoDetectLanguage = (
  currentLng,
  defaultLng,
  availableLngs,
  originalPath
) => {
  if (!canAccessStorage()) {
    return;
  }

  const userLang = lookup(availableLngs, navigatorLanguages(), defaultLng);

  if (!checkDidAutoDetect() && availableLngs.includes(userLang)) {
    setDidAutoDetect(true);

    if (userLang === currentLng) {
      return;
    }

    const newUrl = originalPath(userLang);
    window.location.href = newUrl;
  }
};

const setDidAutoDetect = () => {
  if (canAccessStorage()) {
    sessionStorage.setItem('userLangSet', true);
  }
};

const checkDidAutoDetect = () => {
  if (canAccessStorage()) {
    const data = sessionStorage['userLangSet'];
    return data;
  }
};

const getStringsWithFallback = (i18n, lng, ns, transform) => {
  let resources = i18n.getResourceBundle(lng, ns);
  if (!resources || !Object.keys(resources).length) {
    // fallback to en
    resources = i18n.getResourceBundle(i18n.options.fallbackLng[0], ns);
  }
  return typeof transform === 'function' ? transform(resources) : resources;
};

export default getStringsWithFallback;

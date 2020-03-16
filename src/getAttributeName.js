function getAttributeName({
  dataProperty,
  key,
  screen,
  separator,
  subKey = null
}) {
  let attributeName = `[data-`;
  if (!!screen) {
    attributeName += `${screen[0]}-`;
  }
  attributeName += `${dataProperty}="${key}`;
  if (!!subKey) {
    attributeName += `${separator}${subKey}`;
  }
  attributeName += `"]`;
  return attributeName;
}
exports.getAttributeName = getAttributeName;

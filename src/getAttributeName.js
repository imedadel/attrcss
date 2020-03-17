function getAttributeName({ name, prefix, variant, separator, screen, keys }) {
  let attributeName = `[data-`;
  if (!!prefix) {
    attributeName += `${prefix}-`;
  }
  if (!!screen) {
    attributeName += `${screen[0]}-`;
  }
  if (!!variant) {
    attributeName += `${variant}-`;
  }
  attributeName += `${name}="${keys[0]}`;
  if (!!keys[1]) {
    attributeName += `${separator}${keys[1]}`;
  }
  attributeName += `"]`;

  return attributeName;
}

exports.getAttributeName = getAttributeName;

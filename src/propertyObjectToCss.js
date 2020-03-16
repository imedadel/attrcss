const { getAttributeName } = require("./getAttributeName");
const entries = args => Object.entries(args);

function propertyObjectToCss({
  cssProperty,
  dataProperty = cssProperty,
  sourceObject,
  separator,
  screen
}) {
  let generatedCss = ``;
  for (const [key, value] of entries(sourceObject)) {
    if (typeof value === "string") {
      generatedCss += `${getAttributeName({
        dataProperty,
        key,
        screen,
        separator
      })} { ${cssProperty}: ${value}; }
			`;
    }
    if (typeof value === "object") {
      for (const [subKey, subValue] of entries(value)) {
        generatedCss += `${getAttributeName({
          dataProperty,
          subKey,
          key,
          screen,
          separator
        })} { ${cssProperty}: ${subValue}; }
				`;
      }
    }
  }
  return generatedCss;
}
exports.propertyObjectToCss = propertyObjectToCss;

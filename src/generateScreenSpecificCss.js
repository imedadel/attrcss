const { propertyObjectToCss } = require("./propertyObjectToCss");
const { getPropertiesArray } = require("./getPropertiesArray");

function generateScreenSpecificCss({ separator, parsedTheme, screen = null }) {
  let generatedCss = ``;
  if (!!screen) {
    generatedCss += `@media (min-width: ${screen[1]}) {\n`;
  }
  getPropertiesArray(parsedTheme).forEach(({ css, source, data }) => {
    generatedCss += propertyObjectToCss({
      cssProperty: css,
      sourceObject: source,
      dataProperty: data || css,
      separator,
      screen
    });
  });
  if (!!screen) {
    generatedCss += `}\n`;
  }
  return generatedCss;
}
exports.generateScreenSpecificCss = generateScreenSpecificCss;

const { propertyObjectToCss } = require("./propertyObjectToCss");

function generateScreenSpecificCss({ separator, parsedTheme, screen = null }) {
  let generatedCss = ``;
  if (!!screen) {
    generatedCss += `@media (min-width: ${screen[1]}) {\n`;
  }
  [
    { css: "color", source: parsedTheme.colors },
    { css: "border-color", source: parsedTheme.colors },
    { css: "background-color", source: parsedTheme.colors },
    { css: "fill", source: parsedTheme.colors },
    { css: "stroke", source: parsedTheme.colors }
  ].forEach(({ css, source, data }) => {
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

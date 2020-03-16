const { generateScreenSpecificCss } = require("./generateScreenSpecificCss");

function generateAllScreensCss({ screens = [], separator, parsedTheme }) {
  let generatedCss = ``;
  screens.forEach(screen => {
    generatedCss += generateScreenSpecificCss({
      separator,
      parsedTheme,
      screen
    });
  });
  return generatedCss;
}
exports.generateAllScreensCss = generateAllScreensCss;

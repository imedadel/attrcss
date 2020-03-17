const deepmerge = require("deepmerge");
const { generateAllScreensCss } = require("./generateAllScreensCss");
const defaultJson = require("./defaultTheme.json");
const entries = args => Object.entries(args);

function generator(src) {
  // Deep merge is there is a user-defined theme
  const parsed = !!src ? deepmerge(defaultJson, require(src)) : defaultJson;

  // Extract the main theme variables
  const {
    separator,
    prefix,
    theme: { screens, colors, spacing, ...properties },
    variants
  } = parsed;

  const css = generateAllScreensCss({
    prefix,
    separator,
    screens: entries(screens),
    colors,
    spacing,
    properties: entries(properties),
    variants
  });

  // for some reason, there are lot sof tabs!!!
  return css.replace(/\t/gi, "");
}
exports.generator = generator;

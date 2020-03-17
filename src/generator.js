const deepmerge = require("deepmerge");
const fs = require("fs-extra");
const { generateAllScreensCss } = require("./generateAllScreensCss");
const defaultJson = require("./defaultTheme.json");
const entries = args => Object.entries(args);

async function generator(src) {
  let customTheme = {};
  if (!!src) {
    try {
      customTheme = await fs.readJson(src);
    } catch (err) {
      console.error(err);
      return;
    }
  }

  // Deep merge if there is a user-defined theme
  const parsed = !!src ? deepmerge(defaultJson, customTheme) : defaultJson;

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

const { generateAllScreensCss } = require("./generateAllScreensCss");
const defaultJson = require("./defaultTheme.json");
const entries = args => Object.entries(args);

function generator(src) {
  const parsed = !!src ? require(src) : defaultJson;
  const separator = parsed.separator;
  const css = generateAllScreensCss({
    separator,
    parsedTheme: parsed.theme,
    screens: [null, ...entries(parsed.theme.screens)]
  });
  // for some reason, there are lot sof tabs!!!
  return css.replace(/\t/gi, "");
}
exports.generator = generator;

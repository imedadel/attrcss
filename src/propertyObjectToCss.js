const { getCode } = require("./getCode");
const entries = args => Object.entries(args);

function propertyObjectToCss({
  name,
  alias,
  options,
  prefix,
  variants = [],
  separator,
  screen
}) {
  let generatedCss = ``;
  for (const [key, value] of options) {
    if (typeof value === "string") {
      [name, ...alias].forEach(a => {
        generatedCss += getCode({
          keys: [key],
          name,
          aliasName: a,
          prefix,
          separator,
          screen,
          value,
          variants
        });
      });
    } else if (Array.isArray(value)) {
      [name, ...alias].forEach(a => {
        generatedCss += getCode({
          keys: [key],
          name,
          aliasName: a,
          prefix,
          separator,
          screen,
          value,
          variants
        });
      });
    } else if (typeof value === "object") {
      for (const [subKey, subValue] of entries(value)) {
        [name, ...alias].forEach(a => {
          generatedCss += getCode({
            keys: [key, subKey],
            name,
            aliasName: a,
            prefix,
            separator,
            screen,
            value: subValue,
            variants
          });
        });
      }
    } else {
      throw new Error("Type of value is different than expected :o");
    }
  }
  return generatedCss;
}
exports.propertyObjectToCss = propertyObjectToCss;

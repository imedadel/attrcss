const { propertyObjectToCss } = require("./propertyObjectToCss");
const entries = args => Object.entries(args);

const extendOptions = ({ extend, options, colors, spacing }) => {
  let extended = [];
  switch (true) {
    case extend.includes("colors"): {
      extended.push(...entries(colors));
    }
    case extend.includes("spacing"): {
      extended.push(...entries(spacing));
    }
    case extend.includes("-spacing"): {
      extended.push(...entries(spacing).map(([k, v]) => [`-${k}`, `-${v}`]));
    }
  }
  extended.push(...entries(options));

  return extended;
};

function generateScreenSpecificCss({
  prefix,
  separator,
  colors,
  spacing,
  properties,
  variants,
  screen = null
}) {
  let generatedCss = ``;

  // Wrap in media query. Seems stupid but does the job so...
  if (!!screen) {
    generatedCss += `@media (min-width: ${screen[1]}) {\n`;
  }

  // Extend can be either spacing or colors, for now.
  properties.forEach(([name, { alias = [], extend = [], ...options }]) => {
    generatedCss += propertyObjectToCss({
      name,
      alias,
      options: extendOptions({ extend, options, colors, spacing }),
      prefix,
      variants: variants[name] || [],
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

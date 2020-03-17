const { generateScreenSpecificCss } = require("./generateScreenSpecificCss");

const getReponsiveProperties = ({ properties, variants }) => {
  return properties.filter(
    ([key]) =>
      variants.hasOwnProperty(key) && variants[key].includes("responsive")
  );
};

function generateAllScreensCss({
  prefix,
  separator,
  screens,
  colors,
  spacing,
  properties,
  variants
}) {
  let generatedCss = ``;

  // Default screen width
  generatedCss += generateScreenSpecificCss({
    prefix,
    separator,
    colors,
    spacing,
    properties,
    variants
  });

  // Remaining screen widths
  screens.forEach(screen => {
    generatedCss += generateScreenSpecificCss({
      prefix,
      separator,
      colors,
      spacing,
      properties: getReponsiveProperties({ properties, variants }),
      variants,
      screen
    });
  });

  return generatedCss;
}
exports.generateAllScreensCss = generateAllScreensCss;

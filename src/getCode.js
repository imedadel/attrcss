const kebab = require("lodash.kebabcase");
const { getAttributeName } = require("./getAttributeName");

const getCode = ({
  name,
  aliasName,
  prefix,
  variants = [],
  separator,
  screen,
  value,
  keys
}) => {
  let code = `${getAttributeName({
    aliasName,
    prefix,
    separator,
    screen,
    keys
  })} {${kebab(name)}:${value};}\n`;

  // Only add pseudo classes if screen is null
  if (!screen) {
    variants.forEach(variant => {
      // Handled in another function
      if (variant === "responsive") {
        return;
      }

      code += `${getAttributeName({
        aliasName,
        prefix,
        separator,
        screen,
        keys,
        variant
      })}:${variant} {${kebab(name)}:${value};}\n`;
    });
  }

  return code;
};

exports.getCode = getCode;

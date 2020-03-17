const sameSourceArray = ({ properties, source }) =>
  properties.map(property => ({ css: property, source }));

// TODO: make this less painful?

const getPropertiesArray = parsedTheme => [
  { css: "background-color", source: parsedTheme.backgroundColor },
  { css: "background-position", source: parsedTheme.backgroundPosition },
  { css: "background-size", source: parsedTheme.backgroundSize },
  { css: "border-radius", source: parsedTheme.borderRadius },
  { css: "border-width", source: parsedTheme.borderWidth },
  { css: "box-shadow", source: parsedTheme.boxShadow },
  { css: "box-shadow", source: parsedTheme.boxShadow },
  { css: "cursor", source: parsedTheme.cursor },
  { css: "fill", source: parsedTheme.fill },
  { css: "flex", source: parsedTheme.flex },
  { css: "flex-grow", source: parsedTheme.flexGrow },
  { css: "flex-shrink", source: parsedTheme.flexShrink },
  { css: "font-family", source: parsedTheme.fontFamily },
  { css: "font-size", source: parsedTheme.fontSize },
  { css: "font-Weight", source: parsedTheme.fontWeight },
  ...sameSourceArray({
    properties: ["color", "border-color", "background-color", "fill", "stroke"],
    source: parsedTheme.colors
  }),
  ...sameSourceArray({
    properties: [
      "padding",
      "padding-left",
      "padding-right",
      "padding-top",
      "padding-bottom",
      "margin",
      "margin-left",
      "margin-right",
      "margin-top",
      "margin-bottom",
      "left",
      "right",
      "top",
      "bottom"
    ],
    source: parsedTheme.spacing
  })
];

exports.getPropertiesArray = getPropertiesArray;

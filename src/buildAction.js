const fs = require("fs");
const { generator } = require("./generator");

const isValidOutputFile = path => RegExp(/\.(css|sass|scss)$/).test(path);
const isValidInputFile = path => RegExp(/\.(json)$/).test(path);

function buildAction(opts) {
  if (!!opts.input && !isValidInputFile(opts.input)) {
    console.error("> The theme must be a JSON file :)");
    return;
  }

  if (!!opts.output && !isValidOutputFile(opts.output)) {
    console.error("> The output file must be a CSS file :)");
    return;
  }

  const src = opts.input || null;
  const dest = opts.output || "attr.css";
  console.log(`> Building from ${src || `the default theme`} to ${dest}`);

  const generatedCss = generator(src);
  fs.writeFile(dest, generatedCss, err => {
    if (err) {
      console.log("> Oopsie :( Try again, maybe?\n");
      console.error(err);
      return;
    }
    console.log("> Done! 🦦");
  });
}
exports.buildAction = buildAction;

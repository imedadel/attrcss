const fs = require("fs-extra");
const { generator } = require("./generator");

const isValidOutputFile = path => RegExp(/\.(css|sass|scss)$/).test(path);
const isValidInputFile = path => RegExp(/\.(json)$/).test(path);

async function buildAction(opts) {
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
  console.log(`> Building from ${src || `the default theme`} to ${dest}...`);

  const themePathIsCorrect = await fs.pathExists(src);
  if (!!src && !themePathIsCorrect) {
    console.log("> 🛑 Hmmm... Are you sure of the path? 🤔\n");
    return;
  }

  const generatedCss = await generator(src);

  try {
    await fs.outputFile(dest, generatedCss);
    console.log("> Done! 🦦");
  } catch (err) {
    console.log("> 🛑 Oopsie. Try again, maybe? 🤔\n");
    console.error(err);
  }
}
exports.buildAction = buildAction;

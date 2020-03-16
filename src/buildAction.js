const fs = require("fs");
const { generator } = require("./generator");

function buildAction(opts) {
  const src = opts.input || null;
  const dest = opts.output || "attr.css";
  console.log(`> building from ${src || `default theme`} to ${dest}`);
  const generatedCss = generator(src);
  fs.writeFile(dest, generatedCss, err => {
    if (err) {
      console.log("Oopsie :(\n");
      console.error(err);
      return;
    }
    console.log("Done!");
  });
}
exports.buildAction = buildAction;

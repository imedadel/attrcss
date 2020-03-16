const fs = require("fs");
const { generator } = require("./generator");

function buildAction(src, dest = "attr.css", opts) {
  console.log(`> building from ${src} to ${dest}`);
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

#!/usr/bin/env node

const sade = require("sade");
const pkg = require("../package.json");
const { buildAction } = require("./buildAction");

const prog = sade("attrcss");
prog.version(pkg.version);

prog
  .command("build")
  .option("--output, -o", "CSS output file")
  .describe(
    "Build the main CSS theme. Expects an optional `.json` entry file and an optional `.css` output file."
  )
  .example("build")
  .example("build -o theme.css")
  .example("build -i ./theme.json -o theme.css")
  .example("build --input ./theme.json --output theme.css")
  .action(buildAction);

prog.parse(process.argv);

#!/usr/bin/env node

const sade = require("sade");
const pkg = require("../package.json");
const { buildAction } = require("./buildAction");

const prog = sade("attrcss");
prog.version(pkg.version);

prog
  .command("build [src] [dest]")
  .describe(
    "Build the main CSS theme. Expects a `.json` entry file and a `.css` output file."
  )
  .example("build ./theme.json theme.css ")
  .action(buildAction);

prog.parse(process.argv);

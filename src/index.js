#!/usr/bin/env node

const sade = require("sade")
const fs = require("fs")
const pkg = require("../package.json")
const defaultJson = require("./defaultTheme.json")
const prog = sade("attrcss")
const entries = args => Object.entries(args)

prog.version(pkg.version)

prog
	.command("build [src] [dest]")
	.describe(
		"Build the main CSS theme. Expects a `.json` entry file and a `.css` output file."
	)
	.example("build ./theme.json theme.css ")
	.action((src, dest = "./attr.css", opts) => {
		console.log(`> building from ${src} to ${dest}`)
		const generatedCss = generator(src)
		fs.writeFile(dest, generatedCss, err => {
			if (err) {
				console.log("Oopsie :(\n")
				console.error(err)
				return
			}
			console.log("Done!")
		})
	})

prog.parse(process.argv)

function generator(src) {
	const parsed = !!src ? require(src) : defaultJson
	const separator = parsed.separator
	const css = generateAllScreensCss({
		separator,
		parsedTheme: parsed.theme,
		screens: [null, ...entries(parsed.theme.screens)],
	})

	// for some reason, there are lot sof tabs!!!
	return css.replace(/\t/gi, "")
}

function generateAllScreensCss({ screens = [], separator, parsedTheme }) {
	let generatedCss = ``
	screens.forEach(screen => {
		generatedCss += generateScreenSpecificCss({
			separator,
			parsedTheme,
			screen,
		})
	})

	return generatedCss
}

function generateScreenSpecificCss({ separator, parsedTheme, screen = null }) {
	let generatedCss = ``

	if (!!screen) {
		generatedCss += `@media (min-width: ${screen[1]}) {\n`
	}

	;[
		{ css: "color", source: parsedTheme.colors },
		{ css: "border-color", source: parsedTheme.colors },
		{ css: "background-color", source: parsedTheme.colors },
		{ css: "fill", source: parsedTheme.colors },
		{ css: "stroke", source: parsedTheme.colors },
	].forEach(({ css, source, data }) => {
		generatedCss += propertyObjectToCss({
			cssProperty: css,
			sourceObject: source,
			dataProperty: data || css,
			separator,
			screen,
		})
	})

	if (!!screen) {
		generatedCss += `}\n`
	}

	return generatedCss
}

function propertyObjectToCss({
	cssProperty,
	dataProperty = cssProperty,
	sourceObject,
	separator,
	screen,
}) {
	let generatedCss = ``

	for (const [key, value] of entries(sourceObject)) {
		if (typeof value === "string") {
			generatedCss += `${getAttributeName({
				dataProperty,
				key,
				screen,
				separator,
			})} { ${cssProperty}: ${value}; }
			`
		}

		if (typeof value === "object") {
			for (const [subKey, subValue] of entries(value)) {
				generatedCss += `${getAttributeName({
					dataProperty,
					subKey,
					key,
					screen,
					separator,
				})} { ${cssProperty}: ${subValue}; }
				`
			}
		}
	}

	return generatedCss
}

function getAttributeName({
	dataProperty,
	key,
	screen,
	separator,
	subKey = null,
}) {
	let attributeName = `[data-`
	if (!!screen) {
		attributeName += `${screen[0]}-`
	}
	attributeName += `${dataProperty}="${key}`
	if (!!subKey) {
		attributeName += `${separator}${subKey}`
	}
	attributeName += `"]`

	return attributeName
}

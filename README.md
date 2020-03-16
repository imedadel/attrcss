<br />

<p align="center">
    <img src="AttrCssBannerGitHub.svg" alt="AttrCss logo" width="100%" />
</p>

<h1 align="center">TailwindCSS using data attributes</h1>

```html
<h1 data-color="blue.500">This is kinda cool</h1>
```

## Usage

This command generates an `attr.css` file that can be used in your project:

```shell
npx attrcss build
```

You can specify a custom `.json` theme file or a different `.css` output file too:

```shell
npx attrcss build --input customTheme.json --output main.css
```

PS. **Use PurgeCSS!**
PPS. I only implemented TailwindCSS colors. I got bored after that 🦦

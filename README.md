<!-- ![wip](https://img.shields.io/badge/-work%20in%20progress-red) -->
<!-- # Dark, please! -->

# ![icon](assets/img/dark-please-logo.png)

> A pleasant-looking low contrast dark theme for VSCode with semantic highlighting.

## Overview

Plenty of themes offer minimalist highlighting focusing on specific aspects of code using a limited color palette. This theme takes the opposite approach.
Utilizing both bold colors and subtle distinctions, anything than _can_ be identified _will_ be identified.

### List of languages supported:

- JavaScript
- CSS/SCSS
- HTML

### **Main window**

Actual look as of June 2022

![Main window look](assets/img/main-window_current-state.png)

## What is this

Semantic highlighting is programmatically generated, based on a configuration of base colors for the different tokens and a list of specific color transformations for token modifiers which can also be stacked to represent different combinations.  
About 8.63% of styles/transformations are manually defined, stepping in where the automatic generation produced less than optimal results.

The definition of colors and transformations follows a [simple spec](https://github.com/Thertzlor/semantic-rainbow/tree/main/generator#user-content-working-with-the-semantic-theme-generator) for easy tweaking and forking to create any number of dynamic semantic themes.

## Creating your theme

As of now one should have Adobe Indesign installed to be able to visually pick colors.
Otherwise you can manually edit HEX values in `./src/ase2json/colors.json`.

In the first case open `./src/ase2json/res/js-syntax-colors.idml` and tweak colors to your likings. Then from `Swatches` palette export color group as `./src/ase2json/res/colors.ase` and run `node ./src/ase2json/ase2json.js`. It will generate the `colors.json` file with key-value pairs where the keys are swatch names and the values are hexidecimal color values.

Then you just run `Package theme` VSCode task and that's it! Just install your fresh `*.vsix` file from `./src/dist`.

To customize semantic scopes edit `./src/converter/tokens.json` and `./src/converter/fallbacks.json` sequentially.

## How it works

```
                 [*.idml]
                     |
                [colors.ase]
                     |
                <ase2json.js>
                     |
                {colors.json}
{tokens.json}        |        {fallbacks.json}
             \       |       /
              \      |      /
            ___________________
            |  <convert.js>   |
            |        |        |
            | {template.json} |
            |_________________|
                     |
               {config.json}
                     |
                <generate.js>
                     |
                {theme.json}
                     |
                 <PACKAGE>
                     |
                [theme.vsix]
```

## Compatibility

This theme relies on the presence of language server that support Semantic Highlighting. Some of the languages with the best support for this feature include JavaScript, TypeScript and Python.  
Keep in mind results might vary based on the language extensions you have installed, and even for non-semantic highlighting the theme attempts to approximate results by providing fallback mappings to TextMate rules including but not limited to the [VSCode semantic token scope map](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#semantic-token-scope-map).

<!-- ## Installation -->

<!-- Install from VSCode or via the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=<...>). -->

## Credits

- [**ACE Util**](https://github.com/dfernandez79/ase-util) — Utility library to handle Adobe Swatch Exchange (ASE) files.
- [**Eppz! Theme**](https://github.com/Geri-Borbas/VSCode.Extension.eppz_Code) — Styling ideas and color palette reference.
- [**Semantic Rainbow Theme**](https://github.com/Thertzlor/semantic-rainbow/) — Used as a starting point.
- [**Horizon Dark Theme**](https://horizontheme.netlify.app/) — Semantic Rainbow started as an extension of this theme and it remains an influence especially in the non-syntax parts.
- [**TinyColor**](https://github.com/bgrins/TinyColor) — Used for color transformations.


## Known bugs

- conversion fails if keys in `colors.json` and values in `tokens.json` does not match at least once

## Todo

- tokenize window colors
- maybe rename fallbacks to insert colors directly and get rid of `tokens.json`

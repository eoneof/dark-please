// This file is used to build config.json for theme generator

const fs = require('fs').promises;
const {readFileSync} = require('fs');

/** @type {{key: value}} */
const template = JSON.parse(
  readFileSync(
    './src/converter/template.json',
    'utf-8')
);

/** @type {{colorName: hexValue}} */
const {colors} = JSON.parse(
  readFileSync(
    './src/ase2json/colors.json',
    'utf-8')
);

/** @type {{tokenName: colorName}} */
const tokensMapping = JSON.parse(
  readFileSync(
    './src/converter/components/tokensMapping.json',
    'utf-8')
);

/** @type {{tokenName: [scope: string]}} */
const fallbacks = JSON.parse(
  readFileSync(
    './src/converter/components/fallbacks.json',
    'utf-8')
);

const textMapping = JSON.parse(
  readFileSync(
    './src/converter/components/textFormatMapping.json',
    'utf-8')
);

/** @type {{token: color}} paired */
const paired = {};

/**
 * Substitute a value with a value of a key which name matches a given value
 * in this case the abstract color tokens is replaced with the actual HEX values
 * e.g. {warning: 'red'} <=> {red: '#f00'} = {warning: '#f00'}
 * @arg {{ colors: {colorName: hexValue}}} source
 * @arg {{ tokens: {token: colorName}}} dest
 */
function matchValues(source, dest)
{
  return Object.entries(source).find(([key /* , val */]) =>
  {
    if (key === undefined) return;

    return dest === key;
  })[1];
}

for (token in tokensMapping)
{
  paired[token] = matchValues(colors, tokensMapping[token]);
}

// Insert data into template's scope
Object.assign(template.themes[0].baseTokenColors, paired);
Object.assign(template.themes[0].textformatMapping, textMapping);
Object.assign(template.themes[0].fallbacks, fallbacks);

// Write config
const dirnames = ['./dist', './build'];

Promise.all([dirnames.map((dirname) => fs.mkdir(dirname, {recursive: true}))])
  .then(() =>
  {
    Promise.all([
      fs.writeFile(
        `./${dirnames[1]}/config.json`,
        JSON.stringify(template, null, 2)),
    ]);
  })
  .then(() => console.log('Converted: OK'))
  .catch(() => process.exit(1));

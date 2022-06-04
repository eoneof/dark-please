// This file is used to build config.json for theme generator

const fs = require('fs').promises;
const { readFileSync } = require('fs');

const template = JSON.parse(readFileSync('./src/converter/template.json', 'utf-8'));
const { colors } = JSON.parse(readFileSync('./src/ase2json/colors.json', 'utf-8'));
const tokens = JSON.parse(readFileSync('./src/converter/tokens.json', 'utf-8'));
const fallbacks = JSON.parse(readFileSync('./src/converter/fallbacks.json', 'utf-8'));
const paired = {};

// Substitute a value with a value of a key which name matches a given value
// in this case the abstract color tokens is replaced with the actual HEX values
// e.g. {warning: 'red'} <=> {red: '#f00'} = {warning: '#f00'}
function matchValues(source, dest) {
  return Object.entries(source).find(([key /* , val */]) => {
    if (key === undefined) {
      return;
    }
    return dest === key;
  })[1];
}

for (let item in tokens) {
  let result = matchValues(colors, tokens[item]);
  paired[item] = result;
}

// Insert data into template's scope
Object.assign(template.themes[0].baseTokenColors, paired);
Object.assign(template.themes[0].fallbacks, fallbacks);

// Write config
fs.mkdir('./converter', { recursive: true })
  .then(() =>
    Promise.all([
      fs.writeFile('./src/generator/config.json', JSON.stringify(template, null, 2)),
    ]),
  )
  .then(() => console.log('Converted: OK'))
  .catch(() => process.exit(1));

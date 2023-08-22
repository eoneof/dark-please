/* 
  This file is used to convert Adobe *.ase swatch file into JSON
  via ASE Util (https://github.com/dfernandez79/ase-util) 
*/
const fs = require('fs');
const aseUtil = require('ase-util');
const inputFile = './ase2json/res/js-syntax-colors.ase';
const outputFile = './ase2json/colors.json';

const data = aseUtil.read(fs.readFileSync(inputFile));

function keepSwatchName(data) {
  // this function is replacing the default one
  // that converts names to kebab-case
  return data; // .toLowerCase();
}

const result = aseUtil.formatAsColorsObject(data, keepSwatchName);

fs.writeFileSync(
  outputFile,
  `{ 
      "$schema": "./colors.schema.json",
      "colors": ${JSON.stringify(result)} 
   }`
);

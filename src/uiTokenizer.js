const fs = require('fs');

const inputFile = 'src/ase2json/ui-colors.json'
const outputFile = 'src/ase2json/tokens.json'

const { colors } = JSON.parse(fs.readFileSync(inputFile))

const tokens = {}

Object.values(colors).forEach((value) => {
  if (!tokens[value]) {
    tokens[value] = value
  }
})

fs.writeFileSync(
  outputFile,
  `{
      "$schema": "./colors.schema.json",
      "colors": ${JSON.stringify(tokens)}
   }`
);

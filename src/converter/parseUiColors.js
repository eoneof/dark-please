const { readFileSync } = require('fs');

const uiColors = JSON.parse(
  readFileSync('./src/ase2json/ui-colors.json', 'utf-8'),
);

//  CONVERT UI FALLBACKS INTO ACTUAL KEY:VALUE PAIRS

const tokens = {};

/**
 * Here we iterate through the array of objects
 * and invert each object so that it's `elements` items
 * becomes keys with value of the `colors` key of the current object o_O
 */
uiColors.forEach((color) => {
  const colorName = Object.keys(color).toString();
  color[`${colorName}`].uiElements.forEach((element) => {
    // assign a color to an element
    tokens[element] = color[`${colorName}`].color;
  });
});

// same as above but set token instead of color
// uiColors.forEach((color) => {
//   const colorName = Object.keys(color).toString();
//   color[`${colorName}`].uiElements.forEach((element) => {
//     // assign a color to an element
//     tokens[element] = colorName;
//   });
// });

console.log(tokens);

// SUBSTITIUTE COLOR TOKENS WITH COLOR VALUES FROM FILE

// mock data (get it from file later on)
// const colors = {
//   bek: '#f00f',
//   white_00: '#fff',
//   black_00: '#bcd',
//   black_01: '#dbc',
// };

// const paired = {};

// function matchValues(source, dest) {
//   return Object.entries(source).find(([key, val]) => {
//     if (key === undefined) {
//       return;
//     }
//     return dest === key; // ?
//   })[0];
// }

// for (let item in tokens) {
//   let result = matchValues(colors, tokens[item]);
//   paired[item] = colors[result]; // ?
// }

// console.log(paired);

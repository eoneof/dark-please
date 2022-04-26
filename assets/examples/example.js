// nonsence example file to demonstrate syntax highlighting

import { text } from './text.js';
export default example;

const example = text;
const selector = document.querySelector('.paage');

var args = Array.prototype.slice.call(arguments);
var args = Array.from(arguments);

function storeNames() {
  return arguments;
}
storeNames('Mulder', 'Scully', 'Alex Kryceck');

function getGrades() {
  var args = Array.prototype.slice.call(arguments, 1, 3);
  return args;
}
console.log(getGrades(90, 100, 75, 40, 89, 95));

// ES5 syntax
class Person {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  log() {
    console.log('I am', this._firstName, this._lastName);
  }

  // setters
  set profession(val) {
    this._profession = val;
  }
  // getters
  get profession() {
    console.log(this._firstName, this._lastName, 'is a', this._profession);
  }
}

let s_firstname = new Symbol();

class Person {
  constructor(firstName, lastName) {
    this[s_firstName] = firstName;
    this._lastName = lastName;
  }

  log() {
    console.log('I am', this._firstName, this._lastName);
  }

  // setters
  set profession(val) {
    this._profession = val;
  }
  // getters
  get profession() {
    console.log(this[s_firstName], this._lastName, 'is a', this._profession);
  }
}

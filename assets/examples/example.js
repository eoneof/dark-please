// nonsense syntax highlighting demo

import {text} from './example.tsx';

class Person {
  /**
   * @param {string} firstName
   * @param {string} lastName
   * @param {number} age
   */
  constructor(firstName, lastName, age) {
    this._firstName = firstName;
    this._lastName = lastName;
    this.age = age;
  }

  log() {
    console.log('I am', this._firstName, this._lastName);
  }

  set profession(val) {
    this._profession = val;
  }

  get profession() {
    return this._profession;
  }
}

const employee = new Person('Jack Poe');

export function demo(args) {

  const example = 'text';
  const selector = document.querySelector('.page');

  var args = Array.prototype.slice.call(example);
  var arr = Array.from(args);

  let [ data, info ] = arr

  function storeNames(props) {
    const id = props.id;
    return arguments(id);
  }

  const grades = () => {
    let args = storeNames({name: 'Mulder', id: [ 40, 89, 95 ] });
  }

}

export default Person;

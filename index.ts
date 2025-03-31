// Constructor function

const Person = function (firstName: string, personBirth: number) {
    // console.log(this);
    // Instance properties: this.some-property
    // instance properties will be available to all instances created through this Person constructor function
    this.firstName = firstName;
    this.personBirth = personBirth;
};

const nemanja = new Person('Nemanja', 1990);
console.log(nemanja);

const jack = new Person('Jack', 1993);
const matilda = new Person('Matilda', 1969);
console.log(jack, matilda);

console.log(jack instanceof Person)

console.log(Person.prototype);

Person.prototype.calcAge = function () {
    console.log(2037 - this.personBirth)
}

void nemanja.calcAge();

// const f = nemanja.calcAge;
// console.log(f())

console.log(nemanja.__proto__ === Person.prototype); // Person.prototype is not prototype of Person, but instead it is what is going to be used as prototype of all the objects that are created from Person constructor function.

console.log(Person.prototype.isPrototypeOf(nemanja)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = "Homo Sapiens";

console.log(nemanja.species, matilda.species);
console.log(nemanja.hasOwnProperty('firstName'));
console.log(nemanja.hasOwnProperty('species'));

console.log(nemanja.__proto__); // prototype of nemanja which is the prototype property of Person
console.log(nemanja.__proto__.__proto__); // prototype property of Object
console.log(nemanja.__proto__.__proto__.__proto__); // returns null -> Object.__proto__ is top of prototype chain

const myArr = Array.from([1, 2, 2, 5, 5, 6, 4, 3, 4, 5]); // new Array === []; as new Object === {};
console.log(myArr.__proto__ === Array.prototype); // true

Array.prototype.unique = function () {
    return [...new Set(this)]; // this will be the array on which this function is called;
};

console.log(myArr.unique()); // returns [1, 2, 5,  6, 4, 3]
console.log(myArr); // returns [1, 2, 2, 5, 5, 6, 4, 3, 4, 5]

const h1 = document.querySelector('h1');

console.log(h1?.__proto__ === HTMLHeadingElement.prototype); // returns true
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
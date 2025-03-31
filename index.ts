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
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #1
// 1.
const Car = function (make: string, speed: number) {
    this.make = make;
    this.speed = speed;
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

// 2.
Car.prototype.accelerate = function () {
    return this.speed += 10;
};

// 3.
Car.prototype.break = function () {
    return this.speed -= 5;
};

console.log(bmw);
console.log(bmw.accelerate());
console.log(bmw);

// 4.
console.log(mercedes);
console.log(mercedes.accelerate());
console.log(mercedes);

console.log(mercedes.break());
console.log(mercedes.break());
console.log(mercedes.break());
console.log(mercedes.break());
console.log(mercedes);

// ES6 - Modern way creating classes:

// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
    constructor(firstName: string, birthYear: number, fullName: string) {
        this.firstName = firstName;
        this.birthYear = birthYear;
        this._fullName = fullName;
    }

    /**
     * greet() {
     *     console.log(`Hello ${this.firstName}!`)
     * }
     */

    get age() {
        return 2037 - this.birthYear;
    }

    // Set a property that already exists
    get fullName() {
        return this._fullName;
    }

    set fullName(name: string) {
        if (name.includes(" ")) {
            this._fullName = name;
        } else {
            alert("Please enter a valid name");
        }
    }

    calcAge() {
        console.log(2037 - this.birthYear)
    }
};

const jessica = new PersonCl('Jessica', 1990, "Nemanja Karaklajic");
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype)
console.log("GET age", jessica.age)
console.log("GET fullName", jessica.fullName)

// console.log(jessica.fullName = );

// Other way to add methods to the specific class:
PersonCl.prototype.greet = function () {
    console.log(`Hello ${this.firstName}!`)
}

jessica.greet();

// Getter and Setter
const account = {
    owner: "Chili",
    movements: [200, 150, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    // setters takes one parameter
    set latest(mov: number) {
        this.movements.push(mov);
    }
};

console.log(account.latest);
account.latest = 88;
console.log(account.movements);
console.log(account.latest);



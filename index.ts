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
    private firstName: string;
    private birthYear: number;

    constructor(firstName: string, birthYear: number, fullName: string) {
        this.firstName = firstName;
        this.birthYear = birthYear;
        this._fullName = fullName;
    };

    private _fullName: string;

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

    /**
     * greet() {
     *     console.log(`Hello ${this.firstName}!`)
     * }
     */

    get age() {
        return 2037 - this.birthYear;
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Coding challenge #2
class CarUS {
    private make: string;
    private speed: number;

    constructor(make: string, speed: number) {
        this.make = make;
        this.speed = speed;
    }

    get speedUS() {
        console.log(`The speed of the ${this.make} is ${this.speed / 1.6} mi/h`)
        return this.speed / 1.6;
    }

    set speedUS(speed: number) {
        this.speed = speed * 1.6;
        console.log(`The speed of the ${this.make} is ${this.speed} mi/h`)
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} accelerated to ${this.speed} km/h`)
    }

    break() {
        this.speed -= 5;
        console.log(`${this.make} decelerated to ${this.speed} km/h`)
    }
}

const ford = new CarUS("Ford", 120);
// console.log(ford)

ford.accelerate(); // 130
ford.accelerate(); // 140
ford.break(); // 135

ford.speedUS; // 135 / 1.6 = 84.375
ford.speedUS = 200; // 200 * 1.6 = 320
console.log(ford)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Inheritance Between Classes - Constructor Functions
const PersonFC = function (firstName: string, birthYear: number) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

PersonFC.prototype.calcAge = function () {
    console.log(`Calculated age: ${2037 - this.birthYear}`);
};

const StudentFC = function (firstName: string, birthYear: number, course: string) {
    PersonFC.call(this, firstName, birthYear); // here we are just calling regular function. Keyword within regular function call is undefined!!!
    // That is why we have to specify (manually set) this keyword;
    // this will be the empty object created using `new`
    this.course = course;
};

// Linking prototypes
StudentFC.prototype = Object.create(PersonFC.prototype); // it is like with classes: class Child = new ParentClass() {}

StudentFC.prototype.introduce = function () {
    console.log(`Hello my name is ${this.firstName}, and I am student at ${this.course}.`)
}

const branko = new PersonFC("Branko", 1990);
console.log(branko.calcAge());

const student = new StudentFC("Nemanja", 1978, "Web Development");
// console.log(student);
// console.log(student.introduce());
// console.log(StudentFC.prototype.isPrototypeOf(student)); // true
// console.log(student.__proto__ === StudentFC.prototype); // true
// console.log(StudentFC.prototype.__proto__);
// console.log(StudentFC.prototype);
// console.dir(StudentFC.prototype.constructor);
// student.calcAge();

// Coding Challenge #3
/**
 * const Car = function (make: string, speed: number) {
 *     this.make = make;
 *     this.speed = speed;
 * };
 */
// 1. Constructor Function
const EV = function (make: string, speed: number, charge: number) {
    Car.call(this, make, speed);
    this.charge = charge;
};

// Link prototypes - inherit Car's methods
EV.prototype = Object.create(Car.prototype);

// 2. implement an 'chargeBattery' method which takes an argument `chargeTo` and sets the battery charge to `chargeTo`;
EV.prototype.chargeBattery = function (chargeTo: number) {
    this.charge = chargeTo;
};

// 3. implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%;
// POLYMORPHISM
// If there are two or more methods with the same name, the first one that appears in the prototype chain will be used!
// This means that child class can override the class inherited from the parent class!!!
EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;

    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%.`)
}

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
console.log(tesla.chargeBattery(90));
console.log(tesla);
tesla.accelerate();
tesla.accelerate();
console.log(tesla)
// tesla.accelerate();
tesla.break();
console.log(tesla)

// console.log(tesla)

class StudentCl extends PersonCl {
    private course: string;

    constructor(firstName: string, birthYear: number, course: string) {
        super(firstName, birthYear, "Nemanja Karaklajic");
        this.course = course;
    };

    introduce() {
        console.log(`My name is ${this.firstName} and I study ${this.course}`)
    }

    calcAge() {
        // super.calcAge();
        console.log(`I am ${this.age} years old, and because of that I am ${this.age / 10} years old in the future.`)
    }
}

const marta = new StudentCl("Marta", 1990, "Web Development");
marta.introduce();
marta.calcAge();

////////////////////////////////////////////////////////////////////////////////////////////
// Inheritance Between "Classes": Object.create
const PersonProto = {
    firstName: "Nemanja",
    birthYear: 1990,
    calcAge() {
        console.log(`Calculated age: ${2037 - this.birthYear}`);
    },
    init(firstName: string, birthYear: number) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const personObj = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName: string, birthYear: number, course: string) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;

    console.log(`Hello my name is ${this.firstName}, and I am student at ${this.course}.`)
};

StudentProto.introduce = function () {
    console.log(`Hello my name is ${this.firstName}, and I am student at ${this.course}.`)
};

const jay = Object.create(StudentProto);

jay.init("Jay", 1994, "Web Development");
jay.calcAge();
jay.introduce();

////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Public fields
 * Private fields
 * Public methods
 * Private methods
 * there is also the static version
 */
class AccountCl {
    // Public fields (instances)
    locale = navigator.language;
    owner: string;
    currency: string;


    // Protected property - convention
    // private _pin: number;
    // private _movements: number[] = [];

    // Private fields
    #movements: number[] = [];
    #pin: number;

    constructor(owner: string, currency: string, pin: number) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
    }

    // Public methods
    get accountIngo() {
        console.dir(`Owner: ${this.owner}, Currency: ${this.currency}, PIN: ${this.pin}, Movements: ${this.movements}, Locale: ${this.locale}`);
        return (`Owner: ${this.owner}, Currency: ${this.currency}, PIN: ${this.pin}, Movements: ${this.movements}, Locale: ${this.locale}`);
    }

    // static getOwnerString() {
    //     return this.owner;
    // }

    getMovements() {
        return this.#movements;
    }

    deposit(value: number) {
        this.#movements.push(value)
    }

    // _approveLoan() {
    //     return true;
    // }

    withdrawal(value: number) {
        this.#movements.push(-value);
        // ...or even do it like: this.deposit(-value);
    }

    requestLoan(value: number) {
        if (this.#approveLoan()) {
            this.withdrawal(value);

            console.log("Loan approved!")
        }
    }

    // Private methods
    #approveLoan() {
        return true;
    }
}

const myAccount = new AccountCl("Nemanja", "EUR", 1234);
myAccount.deposit(100);
myAccount.deposit(20);
myAccount.withdrawal(20);
myAccount.withdrawal(80);

myAccount.requestLoan(100);
console.dir(myAccount);
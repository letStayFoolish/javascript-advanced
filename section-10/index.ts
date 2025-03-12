'use strict';

function greet(name: string) {
  console.log(`Hello ${name}, happy codding! ✨`);

  return name;
}

void greet('Nemanja');

console.log('This is a simple TS template made by Nemanja.');

// function checkAges(
//   ageValue: number,
//   conditionValue: number,
//   condition: 'greater' | 'less' | 'equal'
// ) {
//   switch (condition) {
//     case 'less':
//       if (ageValue < conditionValue) {
//         return `The age ${ageValue} is less than ${conditionValue}`;
//       } else {
//         return `The age ${ageValue} is NOT less than ${conditionValue}`;
//       }
//     case 'equal':
//       if (ageValue === conditionValue) {
//         return `The age ${ageValue} is equal to ${conditionValue}`;
//       } else {
//         return `The age ${ageValue} is NOT equal to ${conditionValue}`;
//       }
//     case 'greater':
//       if (ageValue > conditionValue) {
//         return `The age ${ageValue} is greater than ${conditionValue}`;
//       } else {
//         return `The age ${ageValue} is NOT greater than ${conditionValue}`;
//       }
//   }
// }
//
// const checkCondition = checkAges(34, 65, 'greater');

// console.log(checkCondition);

// Section 030:
// function calculateTip(billValue: number) {
//   const tipValue =
//     billValue >= 50 || billValue <= 300
//       ? Math.floor(billValue * 0.15)
//       : Math.floor(billValue * 0.2);
//
//   console.log(
//     `The bill was ${billValue}, the tip was ${tipValue}, and the total value is ${billValue + tipValue}`
//   );
//
//   return tipValue;
// }
//
// void calculateTip(275);
// void calculateTip(40);
// void calculateTip(430);

// Section 031:
// Section 032:
let updatedName = '';
const isNameUpdated = true;

// if (isNameUpdated) updatedNickName = 'Nemanja';

console.log(updatedName);
// Section 033:
// ...

// Section 034:
// Function declaration:
const age1 = calculateAge(1969);

function calculateAge(birthYear: number) {
  const today = new Date().getFullYear();
  return today - birthYear;
}

// console.log(age1);

// Function expressions:
const calculateMyAge = function (birthYear: number) {
  const today = new Date().getFullYear();
  return today - birthYear;
};

// Can call it after you create it!!!
const age2 = calculateMyAge(1965);

// console.log(age2);

// const friends = ['Nemanja', 'Milica', 'Iva'];
// const newFriendsList = friends.push('Ivan');

// Challenge
function printForecast(temperatures: number[]) {
  let result = '';

  // Loop through the temperatures:
  for (let i = 0; i < temperatures.length; i++) {
    result += `${temperatures[i]}C in ${i + 1} days ... `;
  }

  // Log the result
  console.log('... ', result);
}

// printForecast([17, 21, 23]);
// printForecast([12, 5, -5, 0, 4]);

// ==== CLOSER LOOK AT FUNCTIONS ====
const flight = 'LG234';
type Passenger = {
  name: string;
  passport: number;
};
const chili: Passenger = { name: 'Chili', passport: 1231231231 };

const checkIn = function (flightNum: string, passenger: Passenger) {
  passenger.name = 'Mr. ' + passenger.name; // this way we changed val

  if (flightNum === 'LG234') {
    console.log('Welcome to the airport! ' + passenger.name);
  } else {
    alert('Sorry, this flight is not available!');
  }
};

checkIn(flight, chili);
console.log(chili);

// ==== High-order functions ====
/**
 * Creating an abstraction
 */
const oneWord = function (str: string) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str: string) {
  const [firstLetter, ...rest] = str.split('');

  return firstLetter.toUpperCase() + rest.join('');
};

// HOC Example (passing a function as an argument)
const transformer = function (str: string, fn: (arg: string) => string) {
  console.log(fn(str));

  return fn(str);
};

transformer('irina is the best wifey, yey!', oneWord);
transformer('nemanja', upperFirstWord);

// Arrow HOC function
const sayHello = (greeting: string) => (name: string) =>
  console.log(`${greeting} ${name}`);

void sayHello('Hello')('Nemanja');

type Drink = {
  drinkName: string;
  drinkType: string;
  drinkThis: (firstName: string) => void;
};

const beer: Drink = {
  drinkName: 'Beer',
  drinkType: 'Alcoholic',
  // method
  // drinkThis: function(){};
  drinkThis(firstName: string) {
    console.log(`${firstName}, is drinking ${this.drinkName}`);
  },
};

const juice: Omit<Drink, 'drinkThis'> = {
  drinkName: 'Juice',
  drinkType: 'Non-Alcoholic',
};

beer.drinkThis('Nemanja');

const drinkFn = beer.drinkThis;
// drinkFn(); // TypeError: Cannot read properties of undefined (reading 'drinkName') <- This happened because drinkFn is regular function, and it isn't (method) part of the object

// Call method
// manually setting `this`, and adding args to the function
drinkFn.call(beer, 'Chili'); // using `call` method we can bind `this` keyword to the Object
drinkFn.call(juice, 'Irina'); // using `call` method we can bind `this` keyword to the Object

// Apply method
drinkFn.apply(juice, ['Petar']); // instead of apply (not so popular in modern JS) we use:
drinkFn.call(beer, ...['Matija']);

// Bind method (more important)
/**
 * Manually set `this` keyword for any function call. It returns a new function where the `this` keyword is bind.
 */
const drinkJuice = drinkFn.bind(juice);
drinkJuice('Lazar');

// DOM event elements, `this` keyword is bind to the DOM element which calling that function (callback).
// so we use `bind`, if we need to `this` keyword to points, instead to the DOM element, to the Object which calls that method.
/**
 * lufthansa.planes = 300;
 * lufthansa.buyPlane = function() {
 *    this.planes++;
 *    console.log(this.planes);
 * }
 *
 * document.querySelector(button).addEventListener('click',lufthansa.buyPlane); // this will point to the button element
 *
 * To fix this, instead we should use bind:
 * document.querySelector(button).addEventListener('click',lufthansa.buyPlane.bind(lufthansa)); // This way we point method to its Object!
 */

// Partial application
// const addTax = (rate: number, value: number) => {
//   // return value + value * rate;
//   return () => {
//     return value + value * rate;
//   };
//   // addVAT = addTax.bind(null, 0.23); // null stands for Object, we are not pointing to any object just to a function.
// };
//
// addTax(0.1, 300);

// HOC Example:
const addTax = (rate: number) => {
  return (value: number) => value + value * rate;
};

//                           rate  value
const addVAT = addTax(0.23)(200);

console.log(addVAT);

// Challenge
/**
 * 1. Create a method called registerNewAnswer on the poll object. The method does two things:
 * 1.1 Display a prompt window for the user to input the number of selected option. The prompt should look like this:
 * What is your favorite programming language?
 * 0: JavaScript,
 * 1: Python,
 * 2: Rust,
 * 3: C++
 * (write option number)
 *
 * 1.2 Based on the input number, update the answer array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1.
 *  Make sure to check if the input is a number and if the number makes sense.
 * 2. Call this method whenever the user clicks the "Answer poll" button.
 *
 *
 */

const POLL_OPTIONS = ['0: JavaScript', '1: Python', '2: Rust', '3: C++'];

type Poll = {
  question: string;
  options: typeof POLL_OPTIONS;
  answers: number[];
  registerNewAnswer: () => void;
  displayResults: (type: 'string' | 'array') => void;
};

// const poll: Poll = {
//   question: 'What is your favorite programming language?',
//   options: POLL_OPTIONS,
//   answers: new Array(4).fill(0),
//
//   registerNewAnswer() {
//     const answer: number = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//
//     if (answer > this.options.length - 1) {
//       alert('Invalid answer!');
//     } else {
//       this.answers[answer]++;
//     }
//
//     this.displayResults('array');
//   },
//
//   displayResults(type = 'string') {
//     return type === 'string'
//       ? console.log(`Poll results are ${this.answers.join(', ')}`)
//       : console.log(this.answers);
//   },
// };
//
// poll.registerNewAnswer();
//
// (document.querySelector('.poll') as HTMLButtonElement).addEventListener(
//   'click',
//   poll.registerNewAnswer.bind(poll)
// );
//
// const displayRes = poll.displayResults;
// displayRes.call({ answers: [5, 2, 23] }, 'string');
const passengerCount = 66;

function secureBooking() {
  let passengerCount = 0;

  return function () {
    passengerCount++;

    console.log(`${passengerCount} passenger(s)`);
  };
}

/**
 * **Closure (connection / backpack)**:
 * The function always has access to the variable Environment of execution context in which is created.
 * Even after that execution context is gone.
 *
 * Variable Environment attached to the function, exactly as it was at the time and the place the function was created.
 *
 * In our case, the `booker()` has access to the `passengerCount`-variable. Because it's basically defined in the scope in which booker function actually created.
 *
 * Variable Environment keeps living somewhere in the engine...
 *
 * Thanks to the Closure, functions doesn't lose the connection to variables that existed in functions birthplace.
 *
 * Closure has **priority** over the scope chain!
 */

// A closure gives a function access to all variables of its parent function, even after that parent function has returned.
// The function keeps reference to its outer scope, which preserves the scope chain through time.
const booker = secureBooking();

booker(); // returns 1
booker(); // returns 2
booker(); // returns 3

// console.dir(booker); // check closures

// More examples with closures:
let f: () => void = () => {};

const g = function () {
  const a = 23;

  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;

  f = function () {
    console.log(b * 2);
  };
};

g();
/**
 * at this point of execution, the variable environment of g-function is no longer there,
 * but `f-function`, close over that variable environment, and therefore it is able to access the `a-variable`.
 *
 * The `a` variable is inside the backpack of the `f`-function!
 */
f(); // not even defined inside `g-function`;
console.dir(f); // [[Scopes]]: Closure (g) a: 23

// Re-assigning f-function;
h();
f(); // returns 1554 => 777 * 2; This is good example to show that thanks to closure f-function has access to b-value inside h-function;
console.dir(f); // [[Scopes]]: Closure (h) b: 777

// Coding Challenge #2 Closure

let changeColor = () => {};

(function () {
  const header = document.querySelector('h1') as HTMLElement;

  header.style.color = 'red';

  changeColor = function () {
    header.style.color = 'blue';
  };

  // Thanks to closure this header is in backpack of the callback function
  // That is why header is accessible even after IIFE-function execution context is done some time ago...
  (document.querySelector('body') as HTMLElement).addEventListener(
    'click',
    changeColor
  );
})();

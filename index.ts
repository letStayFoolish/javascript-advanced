/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts: Account[] = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome') as HTMLParagraphElement;
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector(
  '.balance__value'
) as HTMLParagraphElement;
const labelSumIn = document.querySelector(
  '.summary__value--in'
) as HTMLParagraphElement;
const labelSumOut = document.querySelector(
  '.summary__value--out'
) as HTMLParagraphElement;
const labelSumInterest = document.querySelector(
  '.summary__value--interest'
) as HTMLParagraphElement;
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app') as HTMLElement;
const containerMovements = document.querySelector(
  '.movements'
) as HTMLDivElement;

const btnLogin = document.querySelector('.login__btn') as HTMLButtonElement;
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const loginForm = document.querySelector('.login') as HTMLFormElement;
const inputLoginUsername = document.querySelector(
  '.login__input--user'
) as HTMLInputElement;
const inputLoginPin = document.querySelector(
  '.login__input--pin'
) as HTMLInputElement;
const inputTransferTo = document.querySelector(
  '.form__input--to'
) as HTMLInputElement;
const inputTransferAmount = document.querySelector(
  '.form__input--amount'
) as HTMLInputElement;
const inputLoanAmount = document.querySelector(
  '.form__input--loan-amount'
) as HTMLInputElement;
const inputCloseUsername = document.querySelector(
  '.form__input--user'
) as HTMLInputElement;
const inputClosePin = document.querySelector(
  '.form__input--pin'
) as HTMLInputElement;

const displayMovements = function (movements: number[]) {
  containerMovements.innerHTML = ''; // textContent returns only text itself, while on the other hand innerHTML returns everything including html itself

  return movements.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
<!--            <div class="movements__date">3 days ago</div>-->
            <div class="movements__value">${movement}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (movements: number[]) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);

  labelBalance.textContent = `${balance} €`;
};

const displaySummary = function (movements: number[], interestRate: number) {
  labelSumIn.textContent = '';
  labelSumOut.textContent = '';
  labelSumInterest.textContent = '';

  const income = movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  const outcome = movements
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const interestValue = movements
    .filter((mov) => mov > 0)
    .reduce((acc, deposit) => {
      const interestValue = deposit * (interestRate / 100);
      return interestValue > 1 ? acc + interestValue : acc;
    }, 0);

  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(outcome)}€`;
  labelSumInterest.textContent = `${interestValue}€`;
};

let currentAccount;
containerApp.style.opacity = '0';

const login = function (e: any) {
  e.preventDefault();

  currentAccount = accounts?.find(
    (account) => account?.username === inputLoginUsername.value
  );

  if (!currentAccount) {
    inputLoginUsername.value = '';
    console.warn('Wrong username');
    return;
  }
  if (currentAccount?.pin !== Number(inputLoginPin.value)) {
    inputLoginPin.value = '';
    console.warn('Wrong pin');
    return;
  }

  inputLoginPin.blur();
  inputLoginPin.value = inputLoginUsername.value = '';
  containerApp.style.opacity = '100';
  labelWelcome.textContent = `Welcome ${currentAccount?.owner}`;

  displayMovements(currentAccount.movements);
  displayBalance(currentAccount.movements);
  displaySummary(currentAccount.movements, currentAccount.interestRate);
};

btnLogin.setAttribute('type', 'submit');
loginForm.addEventListener('submit', login);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
displayBalance(account1.movements);

/////////////////////////////////////////////////
// const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
//
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1)); // last item from array
// const arr2 = [...arr];
// arr2.reverse();
// console.log(arr2); // reverse, (as splice) actually mutate the original array
// console.log(arr);

// for (const movement of movements) {
//   movement > 0
//     ? console.log(`You deposited +${movement}`)
//     : console.log(`You withdrew ${movement}`);
// }
// movements.forEach((movement) => {
//   movement > 0
//     ? console.log(`You deposited +${movement}`)
//     : console.log(`You withdrew ${movement}`);
// });
//
// const [index, value] = movements.entries();
//
// for (const [index, value] of movements.entries()) {
//   console.log(index + 1, value);
// }
//
// console.log(currencies);
//
// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`);
// });
//
// const uniqueArr = new Set(['chili', 'irina', 'sasha', 'chili']);
//
// console.log(uniqueArr); // return {'chili', 'irina', 'sasha'} -> unique set of passed items
//
// uniqueArr.forEach((value, _, map) => {
//   console.log(`${_}: ${value}`);
// });

// Coding Challenge #1
/**
 * One array for each study (dog owner)
 * Dog is an adult if it is at least 3 years old, and it is puppy if it is less than 3 years old.
 * create function `checkDogs`, which accepts two arrays of dog ages (`dogsJulia` and `dogsKate`)
 *
 */

const juliaDogs: number[] = [3, 5, 2, 12, 7];
const kateDogs: number[] = [4, 1, 15, 8, 3];

const checkDogs: (juliaDogs: number[], kateDogs: number[]) => void = function (
  juliaDogs,
  kateDogs
) {
  const juliaDogsCorrected = juliaDogs.slice(1, -2);

  const dogsArr = [...juliaDogsCorrected, ...kateDogs]; // corected Julia's dogs and Kate's dogs

  dogsArr.forEach((dog, index) => {
    if (dog < 3) {
      console.log(`Dog number ${index + 1} is still a puppy`);
    } else {
      console.log(
        `Dog number ${index + 1} is an adult, and it is ${dog} years old`
      );
    }
  });
};

checkDogs(juliaDogs, kateDogs);
const movementsDescription = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);

// console.log(movementsDescription);
/**
 * `forEach` gives us possibility to do something with an existing array, `map` on the other hand - returns a **new array** containing
 * the results of applying an operation on all original array elements.
 */
type Account = {
  owner: string;
  movements: number[];
  interestRate: number;
  pin: number;
  username?: string;
};
const generateUserCredentials = function (accounts: Account[]) {
  // split returns new array
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map((word) => word[0])
      .join('');
  });
};
generateUserCredentials(accounts);
// console.log(accounts);

const deposits = movements.filter((mov) => mov > 0);
// console.log(deposits);

const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);

// Reduce method
const balance = movements.reduce((acc, curr, i, arr) => {
  console.log(acc, curr, i, arr);
  return acc + curr;
}, 0);

// Doing the same using for-of loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
// console.log(balance2);
// console.log(balance);

// Display max value from arr using reduce
const maxValue = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movements[0]
);
// console.log(maxValue);

// Coding challenge #2
const calcAvgHumanAge = function (ages: number[]) {
  // 1. calc the dog age in human age
  const humanAgeArr = ages.map((age) => (age <= 2 ? age * 2 : 16 + age * 4));
  console.log(humanAgeArr);

  // 2. Exclude all dogs that are less than 18 human years old
  const adultDogsArr = humanAgeArr.filter((age) => age >= 18);
  console.log(adultDogsArr);

  // 3. Calc the average human age of all adult dogs
  const avgHumanAge = adultDogsArr.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  return Math.ceil(avgHumanAge);
};

// console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Coding Challenge #3
/**
 * Rewrite `calcAvgHumanAge` function using arrow-function and chaining
 */
const calcAvgHumanAgeArrow = (ages: number[]) => {
  /**
   *   const avgHumanAge = ages
   *     // 1. calc the dog age in human age:
   *     .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
   *     // 2. Exclude all dogs that are less than 18 human years old:
   *     .filter((age) => age >= 18)
   *     // 3. Calc the average human age of all adult dogs:
   *     .reduce((acc, adultAge, i, arr) => acc + adultAge / arr.length, 0);
   */
  const avgHumanAge = ages
    .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, adultAge, i, arr) => acc + adultAge / arr.length, 0);

  return Math.ceil(avgHumanAge);
};

// console.log(calcAvgHumanAgeArrow([5, 2, 4, 1, 15, 8, 3])); // 44
// console.log(calcAvgHumanAgeArrow([16, 6, 10, 5, 6, 1, 4])); // 48

// Method .find() will return first item which satisfied the condition. Find returns element itself NOT array.
const jessicaAccount = accounts.find((acc) => acc.username === 'jd');

console.log(jessicaAccount);

// Doing the same using for-of loop
let foundAcc;
for (const account of accounts) {
  if (account.username === 'jd') {
    foundAcc = account;
    break;
  }
}

console.log(foundAcc);

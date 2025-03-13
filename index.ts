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

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements') as HTMLDivElement;

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function (movements: number[]) {
    containerMovements.innerHTML = ''; // textContent returns only text itself, while on the other hand innerHTML returns everything including html itself

    return movements.forEach((movement, index) => {
        const type = movement > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
<!--            <div class="movements__date">3 days ago</div>-->
            <div class="movements__value">${movement}€</div>
        </div>`

        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}

displayMovements(account1.movements)
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

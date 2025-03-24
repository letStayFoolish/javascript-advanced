'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal') as HTMLDivElement;
const overlay = document.querySelector('.overlay') as HTMLDivElement;
const btnCloseModal = document.querySelector('.btn--close-modal') as HTMLButtonElement;
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

///////////////////////////////////////
// Practice

// Selecting Elements
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

const allSections = document.querySelectorAll(".section");
console.log(allSections); // returns NodeList(4) -> doesn't update automatically;

const allButtons = document.getElementsByTagName("button");
console.log(allButtons); // returns HTMLCollection(9) -> updates automatically

// getElementsByClassName will return live HTMLCollection:
console.log(document.getElementsByClassName('btn'))

// Creating and inserting elements
// .insertAdjacentHTML

// or more programmatically createElement('tag-name'):
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = "Hello World!"; // only text needed
message.innerHTML = `We use cookies for improved functionallity and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
const header = document.querySelector(".header") as HTMLDivElement;
// header.prepend(message); // add as a first child
// if we use prepend and then after it, we insert it using append -> we actually moved the inserted element. Element got inserted only once, any action coming next will actually move element.
header.append(message); // add as a last child

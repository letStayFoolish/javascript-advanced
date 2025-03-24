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
// header.prepend(message.cloneNode(true));
// header.before(message);
// header.after(message);

// Delete elements
(document.querySelector(".btn--close-cookie") as HTMLButtonElement).addEventListener("click", function () {
    message.remove();
});

// Styles
// Inline styles
message.style.backgroundColor = "#37383d"
message.style.width = "120%"

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);

// document.documentElement.style.setProperty("--color-primary", "orangered")

// Attributes
const logo = document.querySelector(".nav__logo") as HTMLImageElement;
console.log(logo.src); // returns absolute path
console.log(logo.getAttribute("src")); // returns relative path to the folder where it belongs
console.log(logo.alt);

// Classes methods
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c");

// Don't use:
// logo.classList = "class-name" // this will override all other classes

// Scrolling animation
const scrollBtn = document.querySelector(".btn--scroll-to") as HTMLButtonElement;
const section1 = document.getElementById("section--1") as HTMLElement;

scrollBtn.addEventListener("click", function () {
    const s1coords = section1.getBoundingClientRect();

    // Old way to scroll
    // window.scrollTo({
    //     left: s1coords.left + window.scrollX,
    //     top: s1coords.top + window.scrollY,
    //     behavior: "smooth"
    // })

    // Modern way:
    section1.scrollIntoView({
        behavior: "smooth",
    })
})

// Capturing vs Bubbling
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

const navLink = document.querySelector(".nav__link") as HTMLAnchorElement;
const navLinks = document.querySelector(".nav__links") as HTMLUListElement;
const nav = document.querySelector(".nav") as HTMLElement;

/**
 * By default, `addEventListener` is listening for a bubbling events, and NOT capturing events.
 * If we want to catch events during the CAPTURING phase instead, we simply add third parameter -> true
 * With this we are listening for events going down from the DOM tree...
 * Capturing: from the document root all the way down to the target;
 *
 *
 * DEFAULT:
 * Receive events from target elements and from BUBBLING phase.
 *
 * When third parameter is set to true (element.addEventListener("click", (e) => {}, true)), that means:
 * Element is now listening for the event as it travels down from the DOW, while other ones (default behaviour)
 * are listening for the event as it travels back up -> they are looking for bubbling events, that's why they gonna happen after
 *
 * navLinks.addEventListener("click", function (e) {
 *     this.style.backgroundColor = randomColor();
 *     // console.log("NAV LINKS EVENT: ", e.target)// will log the element where CLICK (EVENT) happened -> bubbling
 *     console.log("NAV LINKS EVENT: ", e.target, e.currentTarget)
 *     console.log(this === e.currentTarget) // always returns true!
 * }, true);
 */
navLink.addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    // console.log("LINK EVENT: ", e.target) // will log the element where CLICK (EVENT) happened -> bubbling
    console.log("LINK EVENT: ", e.target, e.currentTarget)

    // Stop propagation
    // e.stopPropagation()
});

navLinks.addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    // console.log("NAV LINKS EVENT: ", e.target)// will log the element where CLICK (EVENT) happened -> bubbling
    console.log("NAV LINKS EVENT: ", e.target, e.currentTarget)
    console.log(this === e.currentTarget) // always returns true!
});

nav.addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    // console.log("NAV EVENT: ", e.target)// will log the element where CLICK (EVENT) happened -> bubbling
    console.log("NAV EVENT: ", e.target, e.currentTarget)
});
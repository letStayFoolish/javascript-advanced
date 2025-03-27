///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal') as HTMLDivElement;
const overlay = document.querySelector('.overlay') as HTMLDivElement;
const btnCloseModal = document.querySelector('.btn--close-modal') as HTMLButtonElement;
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allSections = document.querySelectorAll(".section");
const allButtons = document.getElementsByTagName("button");
const message = document.createElement('div');
const header = document.querySelector(".header") as HTMLDivElement;
const logo = document.querySelector(".nav__logo") as HTMLImageElement;
const scrollBtn = document.querySelector(".btn--scroll-to") as HTMLButtonElement;
const section1 = document.getElementById("section--1") as HTMLElement;
const navLink = document.querySelectorAll(".nav__link");
const navLinks = document.querySelector(".nav__links") as HTMLUListElement;
const nav = document.querySelector(".nav") as HTMLElement;

// Modal
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

// Scrolling animation
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

// navLink.forEach((link) => (link as HTMLAnchorElement).addEventListener("click", function (e) {
//     e.preventDefault();
//
//     const id = this.getAttribute("href");
//
//     const selectedSection = document.querySelector(id as string) as HTMLAnchorElement;
//
//     if (!selectedSection) return;
//
//     selectedSection.scrollIntoView({
//         behavior: "smooth",
//     })
// }))

// Event delegation:
// More performance efficient way would be to put event on parent element and let it bubble from event target (element we clicked on):
navLinks.addEventListener("click", function (e) {
    e.preventDefault();

    // One way to do it
    // const id = (e.target as HTMLElement).getAttribute("href");
    // if (!id || !id.includes("#section--")) return;
    // const selectedSection = document.querySelector(id as string) as HTMLAnchorElement;
    // selectedSection.scrollIntoView({
    //     behavior: "smooth",
    // });
    ////////////////////////////////////

    // Second way to do it
    if ((e.target as HTMLElement).classList.contains("nav__link")) {
        const id = (e.target as HTMLElement).getAttribute("href");
        const selectedSection = document.querySelector(id as string) as HTMLAnchorElement;
        selectedSection.scrollIntoView({
            behavior: "smooth",
        });
    }
});

// Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container") as HTMLDivElement;
tabsContainer.addEventListener("click", function (e) {

    const clicked = (e.target as HTMLElement).closest(".operations__tab") as HTMLButtonElement;

    // Guard
    if (!clicked) return;

    tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");

    // Activate content area:
    document.querySelectorAll(".operations__content").forEach(div => div.classList.remove("operations__content--active"));
    (document.querySelector(`.operations__content--${clicked.dataset.tab}`) as HTMLDivElement).classList.add("operations__content--active");
})

// Menu fade animation
const handleHover = function (event: MouseEvent, opacity: string) {
    if ((event.target as HTMLElement).classList.contains("nav__link")) {
        const link = event.target as HTMLElement;
        const siblings = (link.closest('.nav') as HTMLElement).querySelectorAll('.nav__link');
        const logo = (link.closest('.nav') as HTMLElement).querySelector("img") as HTMLImageElement;

        siblings.forEach(el => {
            if (el !== link) (el as HTMLElement).style.opacity = opacity;

        })
        logo.style.opacity = opacity;
    }
}

// `bind()`-method creates a copy of the function that is called on, and it will set this-keyword in this function call to whatever value we pass to bind.
nav.addEventListener("mouseover", function (e) {
    handleHover(e, "0.5")
});
nav.addEventListener("mouseout", function (e) {
    handleHover(e, "1")
});

const sectionTop = section1.getBoundingClientRect().top;
// Sticky header on scroll
// using scroll event -> very bed for performance!
window.addEventListener("scroll", function (e) {
    if (window.scrollY > sectionTop) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }

});
///////////////////////////////////////
// Practice

// Selecting Elements
// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)

console.log(allSections); // querySelectorAll: returns NodeList(4) -> doesn't update automatically;

console.log(allButtons); // getElementsByTagName: returns HTMLCollection(9) -> updates automatically

// getElementsByClassName will return live HTMLCollection:
console.log(document.getElementsByClassName('btn'))

// Creating and inserting elements
// .insertAdjacentHTML

// or more programmatically createElement('tag-name'):
message.classList.add('cookie-message');
// message.textContent = "Hello World!"; // only text needed
message.innerHTML = `We use cookies for improved functionallity and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
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


// Capturing vs Bubbling
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// navLink.addEventListener("click", function (e) {
//     this.style.backgroundColor = randomColor();
//     // console.log("LINK EVENT: ", e.target) // will log the element where CLICK (EVENT) happened -> bubbling
//     console.log("LINK EVENT: ", e.target, e.currentTarget)
//
//     // Stop propagation
//     // e.stopPropagation()
// });
//
// navLinks.addEventListener("click", function (e) {
//     this.style.backgroundColor = randomColor();
//     // console.log("NAV LINKS EVENT: ", e.target)// will log the element where CLICK (EVENT) happened -> bubbling
//     console.log("NAV LINKS EVENT: ", e.target, e.currentTarget)
//     console.log(this === e.currentTarget) // always returns true!
// });
//
// nav.addEventListener("click", function (e) {
//     this.style.backgroundColor = randomColor();
//     // console.log("NAV EVENT: ", e.target)// will log the element where CLICK (EVENT) happened -> bubbling
//     console.log("NAV EVENT: ", e.target, e.currentTarget)
// });

// DOM traversing
const h1 = document.querySelector('h1') as HTMLHeadingElement;

// Going downwards: children
// element.childNodes; element.children; element.firstElementChild; element.lastElementChild;
// console.log(h1.childNodes);
// console.log(h1.children);

// (h1.firstElementChild as HTMLSpanElement).style.color = "orangered";
// (h1.lastElementChild as HTMLSpanElement).style.color = "blue";

// Going upwards: parent
// element.parentNode; element.parentElement; element.closest("tag-name");
// console.log(h1.parentNode);

// console.log(h1.parentElement);

// (h1.closest(".header") as HTMLHeadingElement).style.backgroundColor = "var(--color-primary-opacity)";

// Going sideways: siblings
// element.previousElementSibling; element.nextElementSibling; element.previousSibling; element.nextSibling
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal') as HTMLDivElement;
const overlay = document.querySelector('.overlay') as HTMLDivElement;
const btnCloseModal = document.querySelector('.btn--close-modal') as HTMLButtonElement;
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// const allSections = document.querySelectorAll(".section");
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

// const sectionTop = section1.getBoundingClientRect().top;
// Sticky header on scroll
// using scroll event -> very bed for performance!
// window.addEventListener("scroll", function (e) {
//     if (window.scrollY > sectionTop) {
//         nav.classList.add("sticky");
//     } else {
//         nav.classList.remove("sticky");
//     }
//
// });

// Sticky navigation: Intersection Observer API
// callback
//                        threshold values number[], observer new IntersectionObserver
// function observerCallback(entries: number[], observer: IntersectionObserver) {
//     entries.forEach(entry => {
//             console.log(entry);
//         }
//     )
// }

// options obj
// const observerOptions = {
//     root: null,
//     threshold: [0, 0.2], // value 0 means that our callback will be triggered each time that the target element leaves the viewport completely, or enters the viewport.
//     // rootMargin: "0px",
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const headerCallback = function (entries: any) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        // if (entry.intersectionRatio === 0) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(headerCallback, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
})

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries: any, observer: IntersectionObserver) {
    const [entry] = entries;
    // console.log(entry)
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15, // 15%
});

allSections.forEach((section) => {
    // section.classList.add("section--hidden");
    sectionObserver.observe(section)
});

// Lazy loading images
const allImages = document.querySelectorAll("img[data-src]");

const loadImg = function (entries: any, observer: IntersectionObserver) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    // Replace src (lazy image) with data-src real images
    entry.target.src = entry.target.dataset.src

    entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");

    });

    observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-200px'
})

allImages.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
    // const slider = document.querySelector(".slider") as HTMLDivElement;
    const slides = document.querySelectorAll(".slide");
    const slideBtnLeft = document.querySelector(".slider__btn--left") as HTMLButtonElement;
    const slideBtnRight = document.querySelector(".slider__btn--right") as HTMLButtonElement;
    const dotsContainer = document.querySelector(".dots") as HTMLDivElement;

    let currentSlide = 0;
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

// slides.forEach((slide, index) => {
//     (slide as HTMLDivElement).style.transform = `translateX(${100 * index}%)`
// }); // 0%, 100%. 200%, 300% -> slides.length = 4 (index: 0, 1, 2, 3)

    const goToSlide = function (currentSlide: number) {
        slides.forEach((slide, index) => {
            (slide as HTMLDivElement).style.transform = `translateX(${100 * (index - currentSlide)}%)`
        });
    };

    const createDots = function () {
        slides.forEach((_, index) => {
            dotsContainer.insertAdjacentHTML("beforeend", `
            <button class="dots__dot" data-slide=${index}></button>
            `
            )
        })
    };

    const activeDot = function (slide: number) {
        const dots = document.querySelectorAll(".dots__dot")
        dots.forEach(dotEl => {
            dotEl.classList.remove("dots__dot--active")
        });

        (document.querySelector(`.dots__dot[data-slide="${slide}"]`) as HTMLButtonElement).classList.add("dots__dot--active");
    };

    const nextSlide = function () {
        if (currentSlide === slides.length - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }

        goToSlide(currentSlide);
        activeDot(currentSlide);

    };

    const prevSlide = function () {
        if (currentSlide === 0) {
            currentSlide = 0;
        } else {
            currentSlide--;
        }

        goToSlide(currentSlide);
        activeDot(currentSlide);

    };

    const init = function () {
        goToSlide(0);
        createDots();
        activeDot(0);
    };

    init();
// Next slide logic
    slideBtnRight.addEventListener("click", nextSlide);
// Previous slide logic
    slideBtnLeft.addEventListener("click", prevSlide)
// Move through the slides using arrow keyboard keys
    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            nextSlide();
        }
        if (e.key === "ArrowLeft") {
            prevSlide();
        }
    });

    dotsContainer?.addEventListener("click", function (e) {
        if ((e.target as HTMLButtonElement).classList.contains("dots__dot")) {
            const {slide} = (e.target as HTMLButtonElement).dataset
            goToSlide(Number(slide))
            activeDot(Number(slide));
        }
    });
}
slider();
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
// header.append(message); // add as a last child
// header.prepend(message.cloneNode(true));
// header.before(message);
// header.after(message);

// Delete elements
// (document.querySelector(".btn--close-cookie") as HTMLButtonElement).addEventListener("click", function () {
//     message.remove();
// });

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

// This event waits just HTML and JavaScript code to be loaded
document.addEventListener("DOMContentLoaded", function (e) {
    console.log("HTML Parsed, and DOM tree built!", e)
}) // this event doesn't wait images to be loaded

window.addEventListener("load", function (e) {
    console.log("Images loaded!", e)
}); // not only HTML and JS are loaded, but the external sources as well such as images, css files...

// DEFER and ASYNC scrypt loading
// Regular
`<script src="index.js"></script>`;
/**
 * HEAD:
 * Start parsing the HTML by the browser. Parsing HTML - Building the DOM tree from the HTML elements. If the `scripts` tag is in the head element,
 * Eventually it will be found. That means fetching script and executing the JS code, during this time parsing HTML will be stopped. After this is finished, parsing HTML continues...
 * After parsing html, fetching and executing js code is finished, DOMContentLoaded event is triggered.
 * | Parsing HTML (finished) | Fetch script | executing JS code | Parsing HTML (finished) | DOMContentLoaded |
 *
 * BODY (at the end):
 * HTML is parsed, then `script` tag is found, and only then starts fetching script and after is fetched executing js code.
 * | Parsing HTML (finished) | Fetch script | executing JS code | DOMContentLoaded |
 */
// Async
`<script async src="index.js"></script>`;
/**
 * Fetch script and execute JS code, while HTML is being parsed. This is still not perfect, because parsing HTML stops while executing JS code.
 * | Parsing HTML      | waiting...      | Finish parsing HTML | DOMContentLoaded |
 *      | fetch script | execute JS code |
 */
// Defer
`<script defer src="index.js"></script>`;
/**
 * With defer, script is downloaded asynchronously, but the executing is defered, and it will wait until paring HTML is done.
 * Key difference, parsing html is never interrupted, because JS code is always executed at the end of parsing.
 * | Parsing HTML           | execute JS code | DOMContentLoaded |
 *      | fetch script |
 */

/**
 * Some Key Notes for regular, async and defer script:
 * Regular (end of body):
 * Scripts are fetched and executed after the HTML is completely parsed.
 *
 * Async (in head):
 * Scripts are fetched asynchronously and executed immediately.
 * Usually, the DOMContentLoaded event waits for all scripts to execute, except for async scripts. So, DOMContentLoaded doesn't wait for async script.
 * Scripts not guaranteed to execute in order.
 *
 * Defer (in head):
 * Scripts are fetched asynchronously and executed after the HTML is completely parsed.
 * DOMContentLoaded fires after defer script is executed.
 * Scripts are executed in order.
 */
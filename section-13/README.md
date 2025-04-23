# DOM Advanced

## What is the DOM?

JS <-- DOM (interface) --> BROWSER

- Allows us to make JavaScript interact with the browser;
- We can write JavaScript to **create, modify and delete HTML elements**; set styles, classes and attributes; and listen
  and
  respond to events;
- DOM tree is generated from an HTML document, which can then interact with;
- DOM is a very complex API that contains lots of methods and properties with the DOM tree.

## DOM Organization

### Node:

1. Element
2. Text
3. Comment
4. Document

**Node Methods:** `.textContent`, `.childNodes`, `.parentNode`, `.cloneNode()`.

**Element Methods:** `.innerHTML`, `.classList`, `.children`, `.parentElement`, `.append()`, `.remove()`,
`.insertAdjacentHTML()`, `.querySelector()`, `.closest()`, `.matches()`, `.scrollIntoView()`, `setAttribute()`.

### Inheritance of methods and properties

Any HTMLElement will have access to `.addEvenetListener()`, `.cloneNode()` or `.closest()` methods.
![js-dom-screen-01.png](js-dom-screen-01.png)

## Capturing vs Bubbling

**Capturing phase** event traveling down from the DOM.

**Bubbling phase** event is traveling back up.

![bubbling-screen.png](bubbling-screen.png)

By default, `addEventListener` is listening for a bubbling events, and **NOT** capturing events.
If we want to catch events during the _CAPTURING_ phase instead, we simply add(set) third parameter -> `true`.

With this, we are listening for events going **down** from the DOM tree...

Capturing: from the document root all the way down to the target.

DEFAULT behaviour:
Receive events from target elements and from **BUBBLING** phase.

When third parameter is set to `true`:

```js
element.addEventListener("click", (e) => {
}, true);
```

that means:
Element is now listening for the event as it travels down from the (top) DOM, while other ones (default behaviour)
are listening for the event as it travels back up -> they are looking for bubbling events, that's why they're going to
happen after.

```js
navLinks.addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    console.log("NAV LINKS EVENT: ", e.target)// will log the element where CLICK (EVENT) happened -> bubbling
    console.log("NAV LINKS EVENT: ", e.target, e.currentTarget)
    console.log(this === e.currentTarget) // always returns true!
}, true);

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
```

## DOM traversing

### Going downwards: children

```ts
const h1 = document.querySelector('h1');

element.childNodes;
element.children;
element.firstElementChild;
element.lastElementChild;
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = "orangered";
h1.lastElementChild.style.color = "blue";

```

### Going upwards: parent

```ts
element.parentNode;
element.parentElement;
element.closest("tag-name");

console.log(h1.parentNode);
console.log(h1.parentElement);

(h1.closest(".header") as HTMLHeadingElement).style.backgroundColor = "var(--color-primary-opacity)";
```

### Going sideways: siblings

```ts
element.previousElementSibling;
element.nextElementSibling;
element.previousSibling;
element.nextSibling

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);
```

## Regular, Async and Defer script loading

Start parsing the HTML by the browser.
Parsing HTML - Building the DOM tree from the HTML elements.

### Regular

**HEAD**

If the `script` tag is in the head element, eventually it will be found. That means fetching script and executing the JS
code, during this time parsing HTML will be stopped. After this is finished, parsing HTML continues. After parsing html,
fetching and executing js code is finished, DOMContentLoaded event is triggered.

| Parsing HTML | Fetch script | executing JS code | Parsing HTML (finished) | DOMContentLoaded |

```html

<html>
<head>
    <script src="script.js"></script>
</head>
</html>
```

**BODY** (at the end)

HTML is parsed, then `script` tag is found, and **ONLY** then starts fetching script and after is fetched executing js
code.

| Parsing HTML (finished) | Fetch script | executing JS code | DOMContentLoaded |

```html

<html>
<head>
    <!--  code goes here...-->
</head>

<body>
<!--rest of the code...-->
<script src="script.js"></script>
</body>
</html>
```

### ASYNC (head)

While HTML is being parsed, fetch script in the background and execute JS code. This is still not perfect, because
parsing HTML stops while executing JS code.

| Parsing HTML | ______ waiting... | Finish parsing HTML | DOMContentLoaded |
<br>___| fetch script | execute JS code |

```html

<head>
    <script async src="script.js"></script>
</head>
```

### DEFER (head)

With defer, script is downloaded asynchronously, but the executing is defered, and it will wait until parsing HTML is
done.
Key difference, parsing html is never interrupted, because JS code is always executed at the end of parsing.

| Parsing HTML (finished) | execute JS code | DOMContentLoaded |
<br>____| fetch script |

```html

<head>
    <script defer src="script.js"></script>
</head>
```

### Key notes

**Regular (end of body):**

* Scripts are fetched and executed after the HTML is completely parsed.

**Async (in head):**

* Scripts are fetched asynchronously and executed immediately.
* Usually, the DOMContentLoaded event waits for all scripts to execute, except for async scripts. So, DOMContentLoaded
  doesn't wait for async script.
* Scripts not guaranteed to execute in order.

**Defer (in head):**

* Scripts are fetched asynchronously and executed after the HTML is completely parsed.
* DOMContentLoaded fires after defer script is executed.
* Scripts are executed in order.
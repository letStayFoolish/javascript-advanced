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


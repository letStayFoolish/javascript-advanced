# OOP - Object-Oriented Programming with JavaScript

OOP is programming paradigm based on the **concept of objects**.

We use object as a **model** to describe real-world or abstract features.

Objects can contain data (**properties**) and code (**methods**). By using objects, we pack **data and corresponding
behaviour** into one block.

Objects are **building blocks** of applications, and **interact** with one another.

Interactions happen through a **public interface** (API): methods that the code **outside** of object can access and use
to
communicate with the object.

OOP is developed to **organize** code and make it **more flexible and easier ot maintain**.

## Classes and Instances (Traditional OOP)

**Class** is like a blueprint from which we can create **new objects**.

**Instance** is real object we can use in our code, which is created from a class. -> Class itself is not an object.

## The 4 Fundamental OOP Principles

### Abstraction

* Ignoring or hiding details that we **don't matter**, allowing to get an **overview** perspective of the _thing_ we are
  implementing.

### Encapsulation

* Keeping properties and methods **private** inside the class, so they are **not accessible from the outside the class
  **. Some methods can be **exposed** as a public interface (API).

### Inheritance

* Child class extends (inherits) the parent class.
* Making all properties and methods of a certain class **available to a child class**, forming hierarchical relationship
  between classes.
    * This allows to **reuse common logic** and to model real-world relationship.
    * Child could own its own properties and methods.

### Polymorphism

* A child class can **overwrite** a method it inherited from a parent class.
* Polymorphism - many forms.

## Prototypes

Each object has its prototype.

Objects are **linked** to prototype object.

Prototype has methods, that object can access to.

### Prototypal Inheritance / Delegation

Behaviour (methods) is **delegated** to the linked prototype object.

For example:
`Array.prototype.map()`

`Array.prototype` is the **prototype** of all array objects we create in JavaScript. Therefore, **all** array object has
access to the map method!

### Constructor Function

Before ES6, we used to create classes using constructor function.

```ts
const Person = function (firstName: string, birthYear: number) {
    consol.elog(this);

    this.firstName = firstName;
    this.birthYear = birthYear;
}

new Person("Cihili", 1990);

/**
 * When we create constructor function, this is what happens behind the scenes (using `new` keyword):
 * 1. An empty object is created: {};
 * 2. Constructor Function call is set to the new object, `this` is equal to newly created object: this = {};
 * 3. The new object {} is linked to the constructor function's prototype property (`__proto__` property);
 * 4. The new object is returned from the constructor function call.
 */
```

```ts
console.log(nemanja.__proto__ === Person.prototype); // Person.prototype is not prototype of Person, but instead it is what is going to be used as prototype of all the objects that are created from Person constructor function.


console.log(Person.prototype.isPrototypeOf(nemanja)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// To be less confusing, it would be better instead of .prototype to be called like: .prototypeOfLinkedObjects
```

## ES6 - Modern way of writing classes in JS

```js
// Class declaration
class PersonCL {
};

// Class expression
const PersonCl = class {
};

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode
```
// Constructor function

const Person = function (firstName: string, personBirth: number) {
    // console.log(this);
    // Instance properties: this.some-property
    // instance properties will be available to all instances created through this Person constructor function
    this.firstName = firstName;
    this.personBirth = personBirth;
};

const nemanja = new Person('Nemanja', 1990);
console.log(nemanja);

const jack = new Person('Jack', 1993);
const matilda = new Person('Matilda', 1969);
console.log(jack, matilda);

console.log(jack instanceof Person)


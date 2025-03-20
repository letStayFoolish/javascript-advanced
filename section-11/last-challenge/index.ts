console.log('Hello from last challenge');

type Dog = {
  weight: number;
  currFood: number;
  owners: string[];
  recommendedFood?: number;
};

// TEST DATA:
const dogs: Dog[] = [
  { weight: 22, currFood: 250, owners: ['Alice', 'Bob'] },
  {
    weight: 8,
    currFood: 200,
    owners: ['Matilda'],
  },
  { weight: 13, currFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, currFood: 340, owners: ['Michael'] },
];

// 1. Add new field `recommendedFood`: recommendedFood = weight * 0,75;
dogs.forEach(
  (dog) => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

// console.log({ dogs });

// 2. Find Sarah's and log
const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));

console.log({ dogSarah });

const isDogEatingTooMuch = (dog: Dog) =>
  dog.currFood > (dog.recommendedFood as number);

console.log(
  `Sarah's dog is eating too ${isDogEatingTooMuch(dogSarah as Dog) ? 'much' : 'little'}`
);

// 3. Create an array containing all owners of dogs who eat too much (use map() + flat() or flatMap())
const ownersEatTooMuch = dogs
  .filter((dog) => isDogEatingTooMuch(dog))
  .flatMap((dog) => dog.owners);

const ownersEatTooLittle = dogs
  .filter((dog) => !isDogEatingTooMuch(dog))
  .flatMap((dog) => dog.owners);

// 4. log owners whose dogs eat too much/little
console.log(`${ownersEatTooMuch.join(' and ')}'s eat too much.`);
console.log(`${ownersEatTooLittle.join(' and ')}'s eat too little.`);

// 5.
console.log(
  dogs.some((dog) => dog.currFood === (dog.recommendedFood as number))
);

// 6.

const checkEatingOk = (dog: Dog) => {
  return (
    dog.currFood > (dog.recommendedFood as number) * 0.9 &&
    dog.currFood < (dog.recommendedFood as number) * 1.1
  );
};

console.log(dogs.some(checkEatingOk));

// 7.
console.log(dogs.filter(checkEatingOk));

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in ascending order
console.log(
  [...dogs].sort(
    (
      { recommendedFood: recommendedFoodA },
      { recommendedFood: recommendedFoodB }
    ) => (recommendedFoodA as number) - (recommendedFoodB as number)
  )
);

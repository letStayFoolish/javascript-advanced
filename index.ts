console.log('Hello world! Section #16');

// Coding Challenge #1
/**
 * 1. Create function `whereAmI` which takes inputs latitude (lat) and longitude (lng)
 */

const whereAmI = async function (lat: number, lng: number) {
  const request = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then(response => {
      if (!response || !response.ok)
        throw new Error(`An error occurred ${response.status}`);

      if (response.status === 403)
        throw new Error(
          `You have sent too many requests. Limit is 3 requests per second. Error status: ${response.status}`
        );

      console.log({ response });

      return response.json();
    })
    .then(data => console.log(`You are in ${data.city}, ${data.country}`))
    .catch(error => console.error(`Error happened: ${error.message}`));
};

// void whereAmI(52.508, 13.381);
// void whereAmI(19.037, 72.873);
// void whereAmI(-33.933, 18.474);

console.log('==== Test Start ===='); // #1 Immediately goes to call stack
setTimeout(() => console.log('0 sec timer.'), 0); // #4 And at the end we log this one (after the call stack is empty)
Promise.resolve('Resolved promise 1.').then(res => console.log(res)); // #3 Promises are part of the Microtasks queue (always have priority over the callback queue

// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 10000000000; i++) {}
//
//   console.log(res);
// });

console.log('==== Test End ===='); // #2 Second execution within the call stack.

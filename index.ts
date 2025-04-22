console.log("Hello world! Section #16");

// Coding Challenge #1
/**
 * 1. Create function `whereAmI` which takes inputs latitude (lat) and longitude (lng)
 */

const whereAmI = async function (lat: number, lng: number) {
    const request = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
        .then(response => {
            if (!response || !response.ok) throw new Error(`An error occurred ${response.status}`);

            if (response.status === 403) throw new Error(`You have sent too many requests. Limit is 3 requests per second. Error status: ${response.status}`);

            console.log({response});

            return response.json()
        })
        .then(data => console.log(`You are in ${data.city}, ${data.country}`))
        .catch(error => console.error(`Error happened: ${error.message}`));
}

void whereAmI(52.508, 13.381);
void whereAmI(19.037, 72.873);
void whereAmI(-33.933, 18.474);

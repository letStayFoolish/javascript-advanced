console.log("Hello world!");
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form') as HTMLFormElement;
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type') as HTMLInputElement;
const inputDistance = document.querySelector('.form__input--distance') as HTMLInputElement;
const inputDuration = document.querySelector('.form__input--duration') as HTMLInputElement;
const inputCadence = document.querySelector('.form__input--cadence') as HTMLInputElement;
const inputElevation = document.querySelector('.form__input--elevation') as HTMLInputElement;

let map: any, mapEvent: any;

const getCoords = function () {
    return navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const coords = [latitude, longitude]

        map = L.map('map').setView(coords, 13); // 'map' id name of element where we gonna store map <div id="map"></div>

        L.tileLayer(`https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);


        map.on("click", function (event: any) {
            // Initially clear the form input fields
            inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';


            form.classList.remove('hidden');
            inputDistance.focus();

            mapEvent = event;

            // console.log(mapEvent)
            //
            // const {lat, lng} = mapEvent.latlng
            //
            // L.marker([lat, lng]).addTo(map)
            //     .bindPopup(L.popup({
            //         maxWidth: 300,
            //         minWidth: 100,
            //         autoClose: false,
            //         closeOnClick: false,
            //         className: `running-popup`,
            //     }))
            //     .setPopupContent(`Running`)
            //     .openPopup();
        });

        console.log({latitude, longitude})
        console.log(`https://www.google.rs/maps/@${latitude},${longitude}`)
    }, error => {
        console.log(error);
    });
}

getCoords();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const {lat, lng} = mapEvent.latlng

    L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 300,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `running-popup`,
        }))
        .setPopupContent(`Running`)
        .openPopup();
})

inputType.addEventListener('change', (e) => {
    (inputCadence.closest(".form__row") as HTMLDivElement).classList.toggle("form__row--hidden");
    (inputElevation.closest(".form__row") as HTMLDivElement).classList.toggle("form__row--hidden");
})


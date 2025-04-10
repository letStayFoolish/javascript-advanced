console.log("Hello world!");
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const getCoords = function () {
    return navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const coords = [latitude, longitude]

        const map = L.map('map').setView(coords, 13); // 'map' id name of element where we gonna store map <div id="map"></div>

        L.tileLayer(`https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);


        map.on("click", function (mapEvent) {
            console.log(mapEvent)

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
        });

        console.log({latitude, longitude})
        console.log(`https://www.google.rs/maps/@${latitude},${longitude}`)
    }, error => {
        console.log(error);
    });
}

getCoords();


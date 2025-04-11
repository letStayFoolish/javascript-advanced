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

class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition(); // we call the method within constructor - because it will be automatically called as we render App. This is needed behaviour at initialization.
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField)
    }

    _getPosition() {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), error => {
                console.log(error);
            });
        }
    };

    _loadMap(position: any) {
        console.log(this);


        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const coords = [latitude, longitude]

        this.#map = L.map('map').setView(coords, 13); // 'map' id name of element where we gonna store map <div id="map"></div>

        L.tileLayer(`https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);


        this.#map.on("click", this._showForm.bind(this));
    };

    _showForm(event: any) {
        // Initially clear the form input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        this.#mapEvent = event;
        form.classList.remove('hidden');
        inputDistance.focus();
    };

    _toggleElevationField() {
        (inputCadence.closest(".form__row") as HTMLDivElement).classList.toggle("form__row--hidden");
        (inputElevation.closest(".form__row") as HTMLDivElement).classList.toggle("form__row--hidden");
    };

    _newWorkout(e: any) {
        e.preventDefault();

        const {lat, lng} = this.#mapEvent.latlng

        L.marker([lat, lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 300,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `running-popup`,
            }))
            .setPopupContent(`Running`)
            .openPopup();
    };
}

const app = new App();

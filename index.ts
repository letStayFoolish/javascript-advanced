console.log("Hello world!");
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form') as HTMLFormElement;
const containerWorkouts = document.querySelector('.workouts') as HTMLUListElement;
const inputType = document.querySelector('.form__input--type') as HTMLInputElement;
const inputDistance = document.querySelector('.form__input--distance') as HTMLInputElement;
const inputDuration = document.querySelector('.form__input--duration') as HTMLInputElement;
const inputCadence = document.querySelector('.form__input--cadence') as HTMLInputElement;
const inputElevation = document.querySelector('.form__input--elevation') as HTMLInputElement;

class Workout {
    coords: number[]; // [lat, lnt]
    distance: number; // in km
    duration: number; // in min
    date = new Date();
    id = (Date.now() + "").slice(-10);

    constructor(coords: number[], distance: number, duration: number) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

class Running extends Workout {
    cadence: number; // in steps/min
    pace: number;
    type: "running" | "cycling" = "running"

    constructor(coords: number[], distance: number, duration: number, cadence: number) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace()
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    elevationGain: number; // in m
    speed: number;
    type: "running" | "cycling" = "cycling"

    constructor(coords: number[], distance: number, duration: number, elevationGain: number) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration * 60);
        return this.speed;
    }
}

// const run1 = new Running([45.7597, 4.8422], 10, 20, 100);
// const cycling1 = new Cycling([45.7597, 4.8422], 10, 20, 100);

//////////////////////////////////////////////////////////////////////////////////////////
// Application Architecture

class App {
    workouts: any[] = [];
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

        // helper function
        const validInputs = (...inputs: any[]) => inputs.every((input) => (Number.isFinite(input)));

        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const cadence = +inputCadence.value;
        const elevationGain = +inputElevation.value;
        const {lat, lng} = this.#mapEvent.latlng

        let workout: Running | Cycling;

        if (type === "running") {
            // check if input fields are valid
            // if (!Number.isFinite(distance) || !Number.isFinite(duration || !Number.isFinite(cadence))) return alert("Please enter valid values");
            if (!validInputs(distance, duration, cadence)) return alert("Please enter valid values");

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        if (type === "cycling") {
            // check if input fields are valid
            if (!validInputs(distance, duration, elevationGain)) return alert("Please enter valid values");

            workout = new Cycling([lat, lng], distance, duration, elevationGain);
        }

        console.dir(workout)

        this.workouts.push(workout);
        this.renderWorkoutMarker(workout);

        this.workouts.forEach(workout =>
            containerWorkouts.insertAdjacentHTML("beforeend", `
        <li class="workout workout--${workout.type}" data-id="1234567890">
          <h2 class="workout__title">Running on April 14</h2>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">{workout.speed}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">178</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `))


    };

    renderWorkoutMarker(workout: Running | Cycling) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 300,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            }))
            .setPopupContent("workout")
            // .setPopupContent(workout.distance)
            .openPopup();
    }
}

const app = new App();

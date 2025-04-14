const form = document.querySelector('.form') as HTMLFormElement;
const containerWorkouts = document.querySelector('.workouts') as HTMLUListElement;
const inputType = document.querySelector('.form__input--type') as HTMLInputElement;
const inputDistance = document.querySelector('.form__input--distance') as HTMLInputElement;
const inputDuration = document.querySelector('.form__input--duration') as HTMLInputElement;
const inputCadence = document.querySelector('.form__input--cadence') as HTMLInputElement;
const inputElevation = document.querySelector('.form__input--elevation') as HTMLInputElement;

type WorkoutType = "running" | "cycling";

class Workout {
    coords: number[]; // [lat, lnt]
    distance: number; // in km
    duration: number; // in min
    date = new Date();
    id = (Date.now() + "").slice(-10);
    description = "";
    type?: WorkoutType;

    constructor(coords: number[], distance: number, duration: number) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (this.type)
            this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}

class Running extends Workout {
    cadence: number; // in steps/min
    pace: number; // min/km
    type: WorkoutType = "running"

    constructor(coords: number[], distance: number, duration: number, cadence: number) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    elevationGain: number; // in m
    speed: number; // km/h
    type: WorkoutType = "cycling";


    constructor(coords: number[], distance: number, duration: number, elevationGain: number) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration * 60);
        return this.speed;
    }
}

type WorkoutClType = Workout | Running | Cycling;

//////////////////////////////////////////////////////////////////////////////////////////
// Application Architecture
class App {
    workouts: WorkoutClType[] = [];
    #map;
    #mapEvent;
    #mapZoomLevel = 13;


    constructor() {
        this._getPosition(); // we call the method within constructor - because it will be automatically called as we render App. This is needed behaviour at initialization.
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField)
        // this.workouts = [];
        containerWorkouts.addEventListener("click", this._moveToActivity.bind(this));
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

        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const coords = [latitude, longitude]

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // 'map' id name of element where we gonna store map <div id="map"></div>

        L.tileLayer(`https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on("click", this._showForm.bind(this));
    };

    _showForm(event: any) {
        // Initially clear the form input fields
        this.#mapEvent = event;
        form.classList.remove('hidden');
        inputDistance.focus();
    };

    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.style.display = 'none'; // solve the animation effect on hiding form
        form.classList.add('hidden');

        setTimeout(() => form.style.display = 'grid', 1000);
    }

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

        let workout: WorkoutClType | null = null;

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

        if (!workout) return;

        this.workouts.push(workout);
        this._renderWorkoutMarker(workout);

        this._renderWorkoutHtml(workout);

        this._hideForm();
    };


    _renderWorkoutMarker(workout: WorkoutClType) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 300,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            }))
            .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)
            .openPopup();
    }

    _renderWorkoutHtml(workout: WorkoutClType) {
        const html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
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
            <span class="workout__value">${workout.type === "running" && workout instanceof Running ? workout.pace.toFixed(2) : (workout as Cycling).speed}</span>
            <span class="workout__unit">${workout.type === "running" ? "min/km" : "km/h"}</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === "running" ? "🦶🏼" : "⛰"}</span>
            <span class="workout__value">${workout.type === "running" && workout instanceof Running ? workout.cadence : (workout as Cycling).elevationGain}</span>
            <span class="workout__unit">${workout.type === "running" ? "spm" : "m"}</span>
          </div>
        </li>
        `
        containerWorkouts.insertAdjacentHTML("afterbegin", html)
    }

    _moveToActivity(e: any) {
        const workoutEl = e.target.closest(".workout");

        if (!workoutEl) return;

        const foundWorkout = this.workouts.find(workout => workout.id === workoutEl.dataset.id);

        if (!foundWorkout) return;

        this.#map.setView(foundWorkout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            }
        });
    }
}

const app = new App();

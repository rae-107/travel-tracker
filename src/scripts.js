// Imports
import "./css/styles.css";
import "./images/turing-logo.png";
import Traveler from "./Traveler";
import TravelerRepo from "./Traveler-Repository";
import Trips from "./Trips";
import * as dayjs from "dayjs";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

// Global Variables
let traveler;
let travelerID;
let trips;
let destID = 1;
let currentDate = dayjs().format("YYYY/MM/DD");
let displayedCurrentDate = dayjs().format("ddd, MMMM D, YYYY");

// JQuerys
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginButton = document.querySelector('#loginButton')
const loginErrorMessage = document.querySelector('#loginErrorMessage')
const loginContainer = document.querySelector('#loginContainer')
const spentPerYear = document.querySelector("#spentPerYear");
const tripBox = document.querySelector("#trips");
const pendingTripBox = document.querySelector("#pendingTrips");
const date = document.querySelector("#date");
const welcomeText = document.querySelector("#welcome-text");
const inputField = document.querySelector("#inputField");
const calendarSelection = document.querySelector("#calendarSelection");
const nightSelection = document.querySelector("#durationSelection");
const travelerSelection = document.querySelector("#travelersSelection");
const priceEstimate = document.querySelector("#priceEstimate");
const bookTripButton = document.querySelector("#bookTripButton");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const labels = document.querySelectorAll('label')
const errorBox = document.querySelector('#errorBox')
const main = document.querySelector('main')
const nav = document.querySelector('nav')


// Fetch
function fetchData(url, obj) {
  return fetch(url, obj).then((res) => {
    if (!res.ok) {
      if (res.status === 422) {
        throw new Error(`There's a problem processing trip request. Please try again later`);
      }
      throw new Error(`Server down. Please try again later `);
    }
    return res.json();
  });
}

function fetchAll() {
  Promise.all([
    fetchData(`http://localhost:3001/api/v1/travelers/${travelerID}`),
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
  ])
    .then((data) => {
      traveler = new Traveler(data[0]);
      // travelers = new TravelerRepo(data[1].travelers); //GetTravelersByID???????
      trips = new Trips(data[2].trips, data[3].destinations);
      renderPage("approved", tripBox, 147, 220, "trips");
      renderPage("pending", pendingTripBox, 80, 150, "pending-trips");
      initializeSlider();
    })
    .catch((error) => {
      errorBox.classList.remove('hidden')
      errorBox.innerText = `${error}`
      setTimeout(addHidden, 3000)
    });
}


const postTrip = () => {
  if (!nightSelection.value || !travelerSelection.value) {
    errorBox.classList.remove('hidden')
    errorBox.innerText = `Please fill out all necessary fields`
    return;
  }
  if (
    trips.getTripsById(traveler.id).find((trip) => {
      return (
        trip.duration === +nightSelection.value &&
        trip.travelers === +travelerSelection.value &&
        trip.date === dayjs(calendarSelection.value).format("YYYY/MM/DD") &&
        trip.destinationID === destID
      );
    })
  ) {
    errorBox.classList.remove('hidden')
    errorBox.innerText = `It looks like that trip is already booked`
    return;
  }
  return fetchData("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify({
      id: Date.now(),
      userID: traveler.id,
      destinationID: destID,
      travelers: +travelerSelection.value,
      date: dayjs(calendarSelection.value).format("YYYY/MM/DD"),
      duration: +nightSelection.value,
      status: "pending",
      suggestedActivities: [],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      fetchAll();
      renderPage("pending", pendingTripBox, 80, 150, "pending-trips");
      inputField.reset();
      destID = 1;
      errorBox.classList.remove('hidden')
      errorBox.innerText = `${response.message}`
      setTimeout(addHidden, 3000)
    })
    .catch((error) => {
      errorBox.classList.remove('hidden')
      errorBox.innerText = `${error}`
      setTimeout(addHidden, 5000)
    });
};

calendarSelection.setAttribute("min", dayjs(currentDate).format("YYYY-MM-DD"));
calendarSelection.setAttribute(
  "value",
  dayjs(currentDate).format("YYYY-MM-DD")
);

// Event Listeners
bookTripButton.addEventListener("click", function (event) {
  postTrip();
});

inputField.addEventListener("change", function (event) {
  event.preventDefault();
  calculateSelectedTrip(event, destID);
});

loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  validateLogin(event)
  fetchAll();
})

// Functions
function calculateSelectedTrip(event, id) {
  let currentSelectedDestination = trips.getDestinationByDestinationId(id);
  let flightCost =
    currentSelectedDestination.estimatedFlightCostPerPerson *
    travelerSelection.value;
  let lodgingCost =
    currentSelectedDestination.estimatedLodgingCostPerDay *
    nightSelection.value;
  let agentFee = (flightCost + lodgingCost) * 0.1;
  priceEstimate.innerText = ` Est Price: $${Number(
    flightCost + lodgingCost + agentFee
  ).toFixed(2)}`;
}

function renderPage(status, container, height, width, style) {
  container.innerHTML = "";
  date.innerText = displayedCurrentDate;
  welcomeText.innerText = `Welcome, ${traveler.getFirstName()}!`;
  spentPerYear.innerText = `This Years Total $${trips.calculateTripsThisYear(
    traveler.id,
    currentDate
  )}`;
  container.innerHTML += trips
    .getTripsById(traveler.id)
    .reduce((string, userTrip) => {
      if (userTrip.status === status) {
        string += `
    <div class=${style}>
    <img alt=${
      trips.getDestinationByDestinationId(userTrip.destinationID).alt
    } src="${
          trips.getDestinationByDestinationId(userTrip.destinationID).image
        } class="trip-image" height="${height}" width="${width}">
      <div>
      <p id="destination"><strong>${
        trips.getDestinationByDestinationId(userTrip.destinationID).destination
      }</strong></p>
      </div>
      <p id="tripDate">${dayjs(userTrip.date).format("MMMM D, YYYY")}</p>
      <p id="duration"><strong>Nights:</strong> ${userTrip.duration}</p>
      <p id="travelers"><strong>Travelers:</strong> ${userTrip.travelers}</p>
      <p id="status"><em> ...${userTrip.status}... </em></p>
    </div>`;
      }
      return string;
    }, "");
}

function initializeSlider() {
  trips.destinationData.forEach((destination) => {
    swiperWrapper.innerHTML += `
    <div class="swiper-slide" id="${destination.id}"><img alt="${destination.alt}" src="${destination.image}" width="400" height="275">
    <div>
    <p>${destination.destination}</p>
    <p>Lodging Per Night: $${destination.estimatedLodgingCostPerDay}</p>
    <p>Flight Per Person: $${destination.estimatedFlightCostPerPerson}</p>
    </div>
    </div>
    `;
  });
  const swiper = new Swiper(".swiper", {
    centeredSlides: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
    effect: "cube",
    cubeEffect: {
      slideShadows: false,
    },
    direction: "horizontal",
    rewind: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    a11y: {
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      enabled: true,
      lastSlideMessage: "This is the last slide",
    },
  });
  swiper.on("slideChange", function (event) {
    destID = swiper.activeIndex + 1;
    calculateSelectedTrip(event, destID);
  });
}

function addHidden() {
  errorBox.classList.add('hidden')
}

function validateLogin() {
  if (username.value.length === 10 && username.value.slice(0, 8) === 'traveler' && password.value === 'travel' && username.value.slice(-2) > 50) {
    loginErrorMessage.innerText = `User Doesn't Exist`
  } else if (username.value.length === 10 && username.value.slice(0, 8) === 'traveler' && password.value === 'travel') {
    travelerID = username.value[8] + username.value[9]
    displayDashboard()
  } else if(username.value.length === 9 && username.value.slice(0, 8) === 'traveler' && password.value === 'travel') {
    travelerID = username.value[8]
    displayDashboard()
  } else {
    loginErrorMessage.innerText = `Incorrect Username Or Password`
  }
}

function displayDashboard() {
main.classList.remove('hidden')
nav.classList.remove('hidden')
loginContainer.classList.add('hidden')
}
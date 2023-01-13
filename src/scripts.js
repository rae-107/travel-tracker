// Imports
import "./css/styles.css";
import "./images/turing-logo.png";
import Traveler from "./Traveler";
import TravelerRepo from "./Traveler-Repository";
import Trips from "./Trips";
import TravelerRepository from "./Traveler-Repository";
import * as dayjs from "dayjs";
// import Swiper, { Navigation, Pagination, Keyboard, Scrollbar, EffectCube } from 'swiper'
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
// import "swiper/css/effect-cube";
// import "swiper/css/keyboard";
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import "swiper/css/scrollbar";
// import "swiper/css";

// Global Variables
let traveler;
let travelers;
let trips;
let destinations;
let currentDate = dayjs("2020/12/04").format("YYYY/MM/DD");
let displayedCurrentDate = dayjs("2020/12/04").format("ddd, MMMM D, YYYY");

// Fetch
const fetchData = (url) => {
  return fetch(url).then((res) => res.json());
};

const fetchAll = () => {
  Promise.all([
    fetchData("http://localhost:3001/api/v1/travelers/7"),
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
  ]).then((data) => {
    traveler = new Traveler(data[0]);
    travelers = new TravelerRepo(data[1].travelers);
    trips = new Trips(data[2].trips, data[3].destinations);

    renderPage("approved", tripBox, 147, 220, "trips");
    renderPage("pending", pendingTripBox, 80, 150, "pending-trips");
  });
};
fetchAll();

// JQuerys
const spentPerYear = document.querySelector("#spentPerYear");
const tripBox = document.querySelector("#trips");
const pendingTripBox = document.querySelector("#pendingTrips");
const date = document.querySelector("#date");
const welcomeText = document.querySelector("#welcome-text");
let swiperWrapper = document.querySelector(".swiper-wrapper");

// Event Listeners

// Functions
function renderPage(status, container, height, width, style) {
  welcomeText.innerText = `Welcome, ${traveler.getFirstName()}!`;

  date.innerText = displayedCurrentDate;

  spentPerYear.innerText = `Total Spent This Year: $${trips.calculateTripsThisYear(
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
     trips.destinationData.forEach(destination => {
      console.log(destination)
      swiperWrapper.innerHTML += `
      <div class="swiper-slide" id="${destination.id}"><img alt="${destination.alt}" src="${destination.image}" width="400" height="275">
      <div>
      <p>${destination.destination}</p>
      <p>Lodging Per Night: $${destination.estimatedLodgingCostPerDay}</p>
      <p>Flight Per Person: $${destination.estimatedFlightCostPerPerson}</p>
      </div>
      </div>
      `
    });

    const swiper = new Swiper(".swiper", {
      // modules: [Navigation, Pagination, Keyboard, Scrollbar, EffectCube],
      centeredSlides: true,
      effect: "cube",
      cubeEffect: {
          slideShadows: false,
        },
      // grabCursor: true,
      direction: "horizontal",
      loop: true,
      slidesPerView: 1,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
        enabled: true,
      },
      // pagination: {
      //   el: ".swiper-pagination",
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      a11y: {
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          enabled: true,
          lastSlideMessage: "This is the last slide",
        },
    });
    

  console.log(trips.destinationData.map((destination) => destination));
  console.log(trips.destinationData[0]);
}


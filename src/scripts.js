// Imports
import './css/styles.css';
import './images/turing-logo.png'
import Traveler from './Traveler'
import TravelerRepo from './Traveler-Repository'
import Trips from './Trips'
import TravelerRepository from './Traveler-Repository';
import * as dayjs from 'dayjs'
import Swiper from 'swiper'
import 'swiper/css'

// Global Variables
let traveler
let travelers
let trips
let destinations
let currentDate = dayjs('2020/12/04').format('YYYY/MM/DD')
let displayedCurrentDate = dayjs('2020/12/04').format('ddd, MMMM D, YYYY')

// Fetch
const fetchData = (url) => {
    return fetch(url).then(res => res.json())
}

const fetchAll = () => {
  Promise.all([fetchData('http://localhost:3001/api/v1/travelers/7'), fetchData('http://localhost:3001/api/v1/travelers'), fetchData('http://localhost:3001/api/v1/trips'), fetchData('http://localhost:3001/api/v1/destinations')])
  .then(data => {
    traveler = new Traveler(data[0])
    travelers = new TravelerRepo(data[1].travelers)
    trips = new Trips(data[2].trips, data[3].destinations)

    renderPage('approved', tripBox, 147, 220, 'trips')
    renderPage('pending', pendingTripBox, 80, 150, 'pending-trips')
  })
}
fetchAll()

// JQuerys
const spentPerYear = document.querySelector('#spentPerYear')
const tripBox = document.querySelector('#trips')
const pendingTripBox = document.querySelector('#pendingTrips')
const date = document.querySelector('#date')
const welcomeText = document.querySelector('#welcome-text')

// Event Listeners



// Functions
function renderPage(status, container, height, width, style) {
    welcomeText.innerText = `Welcome, ${traveler.getFirstName()}!`
    date.innerText = displayedCurrentDate
    spentPerYear.innerText = `Total Spent This Year: $${trips.calculateTripsThisYear(traveler.id, currentDate)}`
    container.innerHTML += trips.getTripsById(traveler.id).reduce((string, userTrip) => {
    if (userTrip.status === status) {
    string += `
    <div class=${style}>
    <img alt=${trips.getDestinationByDestinationId(userTrip.destinationID).alt} src="${trips.getDestinationByDestinationId(userTrip.destinationID).image} class="trip-image" height="${height}" width="${width}">
      <div>
      <p id="destination"><strong>${trips.getDestinationByDestinationId(userTrip.destinationID).destination}</strong></p>
      </div>
      <p id="tripDate">${dayjs(userTrip.date).format('MMMM D, YYYY')}</p>
      <p id="duration"><strong>Nights:</strong> ${userTrip.duration}</p>
      <p id="travelers"><strong>Travelers:</strong> ${userTrip.travelers}</p>
      <p id="status"><em> ...${userTrip.status}... </em></p>
    </div>`
  } 
  return string
  }, '')


//   <div class="swiper">
//   <!-- Additional required wrapper -->
//   <div class="swiper-wrapper">
//     <!-- Slides -->
//     <div class="swiper-slide">Slide 1</div>
//     <div class="swiper-slide">Slide 2</div>
//     <div class="swiper-slide">Slide 3</div>
//     ...
//   </div>
//   <!-- If we need pagination -->
//   <div class="swiper-pagination"></div>

//   <!-- If we need navigation buttons -->
//   <div class="swiper-button-prev"></div>
//   <div class="swiper-button-next"></div>

//   <!-- If we need scrollbar -->
//   <div class="swiper-scrollbar"></div>
// </div>






}


const swiper = new Swiper('.swiper', {
  // speed: 400,
  // spaceBetween: 100,
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

// console.log(swiper)
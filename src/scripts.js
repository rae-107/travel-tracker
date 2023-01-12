// Imports
import './css/styles.css';
import './images/turing-logo.png'
import Traveler from './Traveler'
import TravelerRepo from './Traveler-Repository'
import Trips from './Trips'
import TravelerRepository from './Traveler-Repository';

// Global Variables
let traveler
let travelers
let trips
let destinations
let currentDate = '2020/12/04'

// Fetch
const fetchData = (url) => {
    return fetch(url).then(res => res.json())
}


const fetchAll = () => {
  Promise.all([fetchData('http://localhost:3001/api/v1/travelers/2'), fetchData('http://localhost:3001/api/v1/travelers'), fetchData('http://localhost:3001/api/v1/trips'), fetchData('http://localhost:3001/api/v1/destinations')])
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
    date.innerText = currentDate
    spentPerYear.innerText = `$${trips.calculateTripsThisYear(traveler.id, currentDate)}`
    container.innerHTML += trips.getTripsById(traveler.id).reduce((string, userTrip) => {
    if (userTrip.status === status) {
    string += `
    <div class=${style}>
    <img src="${trips.getDestinationByDestinationId(userTrip.destinationID).image} class="trip-image" height="${height}" width="${width}">
      <p id="destination"><strong>${trips.getDestinationByDestinationId(userTrip.destinationID).destination}</strong></p>
      <p id="tripDate">${userTrip.date}</p>
      <p id="duration"><strong>Nights:</strong> ${userTrip.duration}</p>
      <p id="travelers"><strong>Travelers:</strong> ${userTrip.travelers}</p>
      <p id="status"><em> ...${userTrip.status}... </em></p>
    </div>`
  } 
  return string
  }, '')
}


// const testDom = () => {
//   trip = new Trips(tripsData, destinationData)

//  
  
//   tripBox.innerHTML += trip.getTripsById(3).reduce((string, userTrip) => {
//     console.log(userTrip)
//     if (userTrip.status === 'approved') {
//     string += `
//     <div class="trips">
//     <img src="${trip.getDestinationByDestinationId(userTrip.destinationID).image} class="trip-image" height="147">
//       <p id="destination"><strong>${trip.getDestinationByDestinationId(userTrip.destinationID).destination}</strong></p>
//       <p id="tripDate">${userTrip.date}</p>
//       <p id="duration"><strong>Nights:</strong> ${userTrip.duration}</p>
//       <p id="travelers"><strong>Travelers:</strong> ${userTrip.travelers}</p>
//       <p id="status"> ...${userTrip.status}... </p>
//     </div>`
//   } else {
//     pendingTripBox.innerHTML += 
//     userTrip += `
//     <div class="pending-trips">
//     <img src="${trip.getDestinationByDestinationId(userTrip.destinationID).image} class="trip-image" height="100">
//       <p id="destination"><strong>${trip.getDestinationByDestinationId(userTrip.destinationID).destination}</strong></p>
//       <p id="tripDate">${userTrip.date}</p>
//       <p id="duration"><strong>Nights:</strong> ${userTrip.duration}</p>
//       <p id="travelers"><strong>Travelers:</strong> ${userTrip.travelers}</p>
//       <p id="status"> ...${userTrip.status}... </p>
//     </div>`
//   }
//   return string
//   }, '')
// }


// testDom()





// Imports
import './css/styles.css';
import './images/turing-logo.png'
import Traveler from './Traveler'
import TravelerRepo from './Traveler-Repository'
import Trips from './Trips'
import destinationData from './data/destinations'
import tripsData from './data/trips'
import travelerData from './data/travelers'
import TravelerRepository from './Traveler-Repository';

// Global Variables
let traveler
let trip


// JQuerys
const spentPerYear = document.querySelector('#spentPerYear')
const tripBox = document.querySelector('#trips')
const pendingTripBox = document.querySelector('#pendingTrips')

// Event Listeners



// Functions
const testDom = () => {
  trip = new Trips(tripsData, destinationData)

  spentPerYear.innerText = `$${trip.calculateTripsThisYear(3, '2022/12/04')}`
  
  tripBox.innerHTML += trip.getTripsById(3).reduce((string, userTrip) => {
    console.log(userTrip)
    if (userTrip.status === 'approved') {
    string += `
    <div class="trips">
    <img src="${trip.getDestinationByDestinationId(userTrip.destinationID).image} class="trip-image" height="147">
      <p id="destination"><strong>${trip.getDestinationByDestinationId(userTrip.destinationID).destination}</strong></p>
      <p id="tripDate">${userTrip.date}</p>
      <p id="duration"><strong>Nights:</strong> ${userTrip.duration}</p>
      <p id="travelers"><strong>Travelers:</strong> ${userTrip.travelers}</p>
      <p id="status"> ...${userTrip.status}... </p>
    </div>`
  } else {
    pendingTripBox.innerHTML += 
    userTrip += `
    <div class="pending-trips">
    <img src="${trip.getDestinationByDestinationId(userTrip.destinationID).image} class="trip-image" height="100">
      <p id="destination"><strong>${trip.getDestinationByDestinationId(userTrip.destinationID).destination}</strong></p>
      <p id="tripDate">${userTrip.date}</p>
      <p id="duration"><strong>Nights:</strong> ${userTrip.duration}</p>
      <p id="travelers"><strong>Travelers:</strong> ${userTrip.travelers}</p>
      <p id="status"> ...${userTrip.status}... </p>
    </div>`
  }
  return string
  }, '')

  // pendingTripBox.innerHTML += trip.getTripsById(3).reduce((string, userTrip) => {
  //   if(userTrip.status === 'pending') {
  //   string += `
  //   <div class="pending-trips">
  //   <img src="${trip.getDestinationByDestinationId(userTrip.destinationID).image} class="trip-image" height="100">
  //     <p id="destination"><strong>${trip.getDestinationByDestinationId(userTrip.destinationID).destination}</strong></p>
  //     <p id="tripDate">${userTrip.date}</p>
  //     <p id="duration"><strong>Nights:</strong> ${userTrip.duration}</p>
  //     <p id="travelers"><strong>Travelers:</strong> ${userTrip.travelers}</p>
  //     <p id="status"> ...${userTrip.status}... </p>
  //   </div>`
  //   }
  //   return string
  // })

}


testDom()





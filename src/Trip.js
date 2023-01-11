class Trip {
  constructor(tripData) {
    this.data = tripData
  }
  getTripsById(userID) {
    const trips = this.data.filter(trip => trip.userID === userID)
    return trips.length === 0 ? 'Can\'t find that user' : trips
  }
}

export default Trip
class Trip {
  constructor(tripData) {
    this.data = tripData
  }
  getTripsById(userID) {
    return this.data.filter(trip => trip.userID === userID)
  }
}

export default Trip
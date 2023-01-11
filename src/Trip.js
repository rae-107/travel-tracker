class Trip {
  constructor(tripData) {
    this.data = tripData
  }
  getTripsById(userID) {
    const trips = this.data.filter(trip => trip.userID === userID)
    return trips.length === 0 ? 'Can\'t find that user' : trips
  }

  getTripsByStatus(status) {
    const tripsByStatus = this.data.filter(trip => trip.status === status)
    return tripsByStatus.length === 0 ? 'No trips found with that status' : tripsByStatus
  }
}

export default Trip
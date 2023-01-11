class Trips {
  constructor(tripsData, destinationData) {
    this.tripsData = tripsData
    this.destinationData = destinationData
  }
  getTripsById(userID) {
    const trips = this.tripsData.filter(trip => trip.userID === userID)
    return trips.length === 0 ? 'Can\'t find that user' : trips
  }

  getDestinationByDestinationId(destinationId) {
    return this.destinationData.find(destination => destination.id === destinationId)
  }

  getTripsByStatus(status) {
    const tripsByStatus = this.tripsData.filter(trip => trip.status === status)
    return tripsByStatus.length === 0 ? 'No trips found with that status' : tripsByStatus
  }


}

export default Trips
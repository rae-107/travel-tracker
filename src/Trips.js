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
    const destination = this.destinationData.find(destination => destination.id === destinationId)
    return !destination ? 'Can\'t find a destination by that id' : destination
  }

  getTripsByStatus(status) {
    const tripsByStatus = this.tripsData.filter(trip => trip.status === status)
    return tripsByStatus.length === 0 ? 'No trips found with that status' : tripsByStatus
  }


}

export default Trips
class Trips {
  constructor(tripsData, destinationData) {
    this.tripsData = tripsData;
    this.destinationData = destinationData;
  }
  getTripsById(userID) {
    const trips = this.tripsData.filter((trip) => trip.userID === userID);
    return trips.length === 0 ? "Can't find that user" : trips;
  }

  getDestinationByDestinationId(destinationId) {
    const destination = this.destinationData.find(
      (destination) => destination.id === destinationId
    );
    return !destination ? "Can't find a destination by that id" : destination;
  }

  getTripsByStatus(status) {
    const tripsByStatus = this.tripsData.filter(
      (trip) => trip.status === status
    );
    return tripsByStatus.length === 0
      ? "No trips found with that status"
      : tripsByStatus;
  }

  calculateTripsThisYear(userID, date) {
    const tripsByYear = this.getTripsById(userID)
      .filter((trip) => trip.date.slice(0, 4) === date.slice(0, 4))
      .reduce((total, trip) => {
        const lodgingCost =
          this.getDestinationByDestinationId(trip.destinationID)
            .estimatedLodgingCostPerDay * trip.duration;
        const flightCost =
          this.getDestinationByDestinationId(trip.destinationID)
            .estimatedFlightCostPerPerson * trip.travelers;
        total += lodgingCost + flightCost;
        return total;
      }, 0);
    const tenPercent = tripsByYear * 0.1;
    return Number(tripsByYear + tenPercent).toFixed(2);
  }
}

export default Trips;

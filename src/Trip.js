class Trip {
  constructor(tripObject) {
    console.log(tripObject)
    this.id = tripObject.id
    this.userID = tripObject.userID
    this.destinationID = tripObject.destinationID
    this.travelers = tripObject.travelers
    this.date = tripObject.date
  }
}

export default Trip
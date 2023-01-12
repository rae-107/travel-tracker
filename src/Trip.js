class Trip {
  constructor(tripObject) {
    console.log(tripObject)
    this.id = tripObject.id
    this.userID = tripObject.userID
    this.destinationID = tripObject.destinationID
  }
}

export default Trip
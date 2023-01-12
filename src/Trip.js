class Trip {
  constructor(tripObject) {
    console.log(tripObject)
    this.id = tripObject.id
    this.userID = tripObject.userID
  }
}

export default Trip
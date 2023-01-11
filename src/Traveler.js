class Traveler {
  constructor(traveler) {
    this.id = traveler.id
    this.name = traveler.name
    this.travelerType = traveler.travelerType
    this.amountSpent = 0
  }
  getFirstName() {
    return this.name.split(' ')[0]
  }
}

export default Traveler
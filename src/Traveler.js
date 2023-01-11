class Traveler {
  constructor(traveler = 0) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.amountSpent = 0;
  }
  getFirstName() {
    return !this.id ? "Can't find that user" : this.name.split(" ")[0];
  }
}

export default Traveler;

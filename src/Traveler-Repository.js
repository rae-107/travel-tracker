class TravelerRepository {
  constructor(travelerData) {
    this.data = travelerData
  }
  getTravelerById(id) {
    const traveler = this.data.find(traveler => traveler.id === id)
    return !traveler ? 'Can\'t find that user' : traveler
  }
}

export default TravelerRepository
class TravelerRepository {
  constructor(travelerData) {
    this.data = travelerData
  }
  getTravelerById(id) {
    const traveler = this.data.find(traveler => traveler.id === id)
    if (!traveler) {
      return 'Can\'t find that user'
    }
    return traveler
  }
}

export default TravelerRepository
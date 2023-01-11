import { expect } from 'chai'
import tripsData from '../src/data/trips'
import destinationData from '../src/data/destinations'
import Traveler from '../src/Traveler'
import Trips from '../src/Trip'

describe('Trip', () => {
  let trips
  let traveler

  beforeEach(() => {
    trips = new Trips(tripsData, destinationData)
    traveler = new Traveler({ id: 1, name: "Ham Leadbeater", travelerType: "relaxer" })
  })

  it("Should be a function", () => {
    expect(Trips).to.be.a("function");
  });

  it('Should be an instance of Trip', () => {
    expect(trips).to.be.an.instanceOf(Trips)
  })  

  it('Should have a property that contains all trips', () => {
    expect(trips.tripsData).to.deep.equal(tripsData)
  })

  it('Should contain a property that contains all destinations', () => {
    expect(trips.destinationData).to.deep.equal(destinationData)
  })

  it('Should find all trips by a users id', () => {
    expect(trips.getTripsById(44)).to.deep.equal(tripsData.slice(0, 2))
  })

  it('Should return Can\'t find that user if id doesn\'t exist', () => {
    expect(trips.getTripsById(51)).to.equal('Can\'t find that user')
  })

  it('Should find all trips with provided status', () => {
    expect(trips.getTripsByStatus('pending')).to.deep.equal([ {
      id: 3,
      userID: 3,
      destinationID: 22,
      travelers: 4,
      date: "2022/05/22",
      duration: 17,
      status: "pending",
      suggestedActivities: [],
    }, {
      id: 6,
      userID: 29,
      destinationID: 35,
      travelers: 3,
      date: "2022/06/29",
      duration: 9,
      status: "pending",
      suggestedActivities: [],
    }, {
      id: 9,
      userID: 24,
      destinationID: 19,
      travelers: 5,
      date: "2022/12/19",
      duration: 19,
      status: "pending",
      suggestedActivities: [],
    }])
  })

  it('Should return No trips found with that status if no trips found with status', () => {
    expect(trips.getTripsByStatus()).to.equal('No trips found with that status')
  })
})
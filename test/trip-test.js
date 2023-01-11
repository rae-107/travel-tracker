import { expect } from 'chai'
import tripData from '../src/data/trips'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

describe('Trip', () => {
  let trip
  let traveler

  beforeEach(() => {
    trip = new Trip(tripData)
    traveler = new Traveler({ id: 1, name: "Ham Leadbeater", travelerType: "relaxer" })
  })

  it("Should be a function", () => {
    expect(Trip).to.be.a("function");
  });

  it('Should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip)
  })  

  it('Should have a property that contains all trips', () => {
    expect(trip.data).to.deep.equal(tripData)
  })

  it('Should find all trips by a users id', () => {
    expect(trip.getTripsById(44)).to.deep.equal(tripData.slice(0, 2))
  })

  it('Should return Can\'t find that user if id doesn\'t exist', () => {
    expect(trip.getTripsById(51)).to.equal('Can\'t find that user')
  })

  it('Should find all trips with provided status', () => {
    expect(trip.getTripsByStatus('pending')).to.deep.equal([ {
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
    expect(trip.getTripsByStatus()).to.equal('No trips found with that status')
  })
})
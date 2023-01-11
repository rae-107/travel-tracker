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
})